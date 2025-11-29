import React from "react";
import type { FileNode } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Folder, File as FileIcon } from "lucide-react";

interface TreeNodeProps {
  node: FileNode;
  checked: Record<string, boolean>;
  onToggle: (path: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, checked, onToggle }) => {
  const isChecked = !!checked[node.path];

  return (
    <div className="pl-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => onToggle(node.path)}
          aria-label={`toggle ${node.name}`}
        />
        <div className="flex items-center gap-1 text-sm select-none">
          {node.isDir ? <Folder className="w-4 h-4" /> : <FileIcon className="w-4 h-4" />}
          <span className="truncate">{node.name}</span>
        </div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="ml-6 mt-1 space-y-1">
          {node.children.map((c) => (
            <TreeNode key={c.path} node={c} checked={checked} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
