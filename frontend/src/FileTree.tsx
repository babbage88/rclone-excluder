import React from "react";
import type { FileNode } from "./types";
import TreeNode from "./TreeNode";

interface FileTreeProps {
  node: FileNode;
  checked: Record<string, boolean>;
  onToggle: (path: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ node, checked, onToggle }) => {
  return (
    <div>
      <TreeNode node={node} checked={checked} onToggle={onToggle} />
    </div>
  );
};

export default FileTree;
