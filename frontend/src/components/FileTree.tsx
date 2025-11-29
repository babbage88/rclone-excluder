import React from "react";
import type { FileNode } from "@/types";
import TreeNode from "@/components/TreeNode";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FileTreeProps {
  root: FileNode;
  checked: Record<string, boolean>;
  onToggle: (path: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ root, checked, onToggle }) => {
  return (
    <Card className="max-h-[60vh]">
      <CardHeader>
        <CardTitle>Directory Tree</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[56vh]">
          <div className="p-3">
            <TreeNode node={root} checked={checked} onToggle={onToggle} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FileTree;
