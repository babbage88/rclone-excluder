import type { FileNode } from "./types";

/**
 * Build rclone exclude lines for each checked path.
 * Directory -> path/**, file -> path
 */
export function generateRcloneExcludeFile(root: FileNode, checked: Record<string, boolean>) {
  const lines: string[] = [];

  function walk(n: FileNode) {
    if (checked[n.path]) {
      if (n.isDir) lines.push(`${n.path}/**`);
      else lines.push(n.path);
      return;
    }
    n.children?.forEach(walk);
  }

  walk(root);
  return lines.join("\n");
}
