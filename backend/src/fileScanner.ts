import { readdir, stat } from "fs/promises";
import path from "path";

export interface FileNode {
  name: string;
  path: string;
  isDir: boolean;
  children?: FileNode[];
}

export async function scanDirectory(rootPath: string): Promise<FileNode> {
  async function walk(currentPath: string): Promise<FileNode> {
    const stats = await stat(currentPath);

    const node: FileNode = {
      name: path.basename(currentPath),
      path: currentPath,
      isDir: stats.isDirectory(),
      children: []
    };

    if (node.isDir) {
      const entries = await readdir(currentPath);
      for (const entry of entries) {
        const full = path.join(currentPath, entry);
        node.children!.push(await walk(full));
      }
    }

    return node;
  }

  return walk(rootPath);
}
