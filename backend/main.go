package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type FileNode struct {
	Path     string     `json:"path"`
	IsDir    bool       `json:"isDir"`
	Children []FileNode `json:"children,omitempty"`
}

func streamScanHandler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		http.Error(w, "missing path", http.StatusBadRequest)
		return
	}

	// SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.WriteHeader(http.StatusOK)

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming not supported", http.StatusInternalServerError)
		return
	}

	// Walk the directory and stream each node
	filepath.Walk(path, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}

		node := FileNode{
			Path:  p,
			IsDir: info.IsDir(),
		}

		b, _ := json.Marshal(node)

		// SSE message
		w.Write([]byte("event: node\n"))
		w.Write([]byte("data: " + string(b) + "\n\n"))
		flusher.Flush()

		time.Sleep(5 * time.Millisecond) // just to simulate progressive loading
		return nil
	})

	// Final message
	w.Write([]byte("event: done\ndata: {}\n\n"))
	flusher.Flush()
}

func main() {
	http.HandleFunc("/api/stream-scan", streamScanHandler)

	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
