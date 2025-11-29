export function generateRcloneExcludeFile(checked: Record<string, boolean>): string {
  const lines: string[] = [];

  for (const path in checked) {
    if (checked[path]) {
      // rclone exclude patterns must be relative or absolute filesystem paths
      lines.push(path);
    }
  }

  return lines.join("\n");
}
