import React from "react";
import type { FileNode } from "./types";

interface TreeNodeProps {
  node: FileNode;
  checked: Record<string, boolean>;
  onToggle: (path: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, checked, onToggle }) => {
  const isChecked = checked[node.path] ?? false;

  return (
    <div style={{ marginLeft: "1rem" }}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(node.path)}
        />
        {node.name}
      </label>

      {node.children?.map((child) => (
        <TreeNode
          key={child.path}
          node={child}
          checked={checked}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TreeNode;
