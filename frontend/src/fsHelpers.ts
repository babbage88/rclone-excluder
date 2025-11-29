import type { FileNode } from "./types";

export function convertHandleToTree(handle: FileSystemDirectoryHandle): Promise<FileNode> {
  async function walk(dir: FileSystemDirectoryHandle, parentPath: string): Promise<FileNode> {
    const node: FileNode = {
      name: dir.name,
      path: parentPath,
      isDir: true,
      children: []
    };

    for await (const [name, entry] of dir.entries()) {
      const childPath = parentPath + "/" + name;

      if (entry.kind === "directory") {
        node.children!.push(await walk(entry, childPath));
      } else {
        node.children!.push({
          name,
          path: childPath,
          isDir: false
        });
      }
    }

    return node;
  }

  return walk(handle, "");
}
