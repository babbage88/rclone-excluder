export interface FileNode {
  path: string;
  isDir: boolean;
}

export function streamScan(path: string, onNode: (node: FileNode) => void, onDone: () => void) {
  const encoded = encodeURIComponent(path);
  const es = new EventSource(`/api/stream-scan?path=${encoded}`);

  es.addEventListener("node", (e: MessageEvent) => {
    const node = JSON.parse(e.data) as FileNode;
    onNode(node);
  });

  es.addEventListener("done", () => {
    onDone();
    es.close();
  });

  es.onerror = () => {
    es.close();
  };

  return () => es.close();
}

