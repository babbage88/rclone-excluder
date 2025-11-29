import { useState } from "react";
import FileTree from "./FileTree";
import type { FileNode } from "./types";
import { generateRcloneExcludeFile } from "./generatePatterns";

function App() {
  const [tree, setTree] = useState<FileNode | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [systemPath, setSystemPath] = useState("");

  async function handleScan() {
    if (!systemPath.startsWith("/")) {
      alert("You must enter a valid absolute path to send to backend.");
      return;
    }

    const res = await fetch(`http://localhost:4000/api/scan?path=${encodeURIComponent(systemPath)}`);
    const data = await res.json();

    if (data.error) {
      alert("Backend error: " + data.error);
      return;
    }

    setTree(data);
  }

  function toggle(path: string) {
    setChecked((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  }

  function downloadExcludeFile() {
    const text = generateRcloneExcludeFile(checked);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exclude.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>rclone Excluder UI</h1>

      <p>Enter the absolute path of your media directory:</p>

      <input
        type="text"
        placeholder="/mnt/media/TV"
        value={systemPath}
        onChange={(e) => setSystemPath(e.target.value)}
        style={{ width: "400px" }}
      />

      <br /><br />

      <button onClick={handleScan}>Scan Directory</button>

      <hr />

      {tree && (
        <>
          <FileTree node={tree} checked={checked} onToggle={toggle} />
          <button onClick={downloadExcludeFile} style={{ marginTop: "2rem" }}>
            Download Exclude File
          </button>
        </>
      )}
    </div>
  );
}

export default App;
