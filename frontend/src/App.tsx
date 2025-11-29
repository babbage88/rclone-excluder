import { useState } from "react";
import { streamScan, type FileNode } from "./api/stream";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  const [path, setPath] = useState("/mnt/media/TV");
  const [nodes, setNodes] = useState<FileNode[]>([]);
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setNodes([]);
    setScanning(true);

    streamScan(
      path,
      (node) => {
        setNodes((prev) => [...prev, node]); // incremental append
      },
      () => {
        setScanning(false);
      }
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Rclone Excluder — Streaming Mode</h1>

      <Card>
        <CardHeader>
          <CardTitle>Scan server filesystem (Streaming)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />

          <Button onClick={startScan} disabled={scanning}>
            {scanning ? "Scanning…" : "Stream Scan"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Streaming Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[500px] overflow-auto text-sm font-mono space-y-1">
            {nodes.map((n) => (
              <div key={n.path}>
                {n.isDir ? "📁" : "📄"} {n.path}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
