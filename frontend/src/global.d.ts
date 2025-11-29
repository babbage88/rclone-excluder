/// <reference lib="dom" />

interface Window {
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}
