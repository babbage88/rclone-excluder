// Fix missing window.showDirectoryPicker types

interface DirectoryPickerOptions {
  id?: string;
  mode?: "read" | "readwrite";
  startIn?: FileSystemHandle | string;
}

interface FilePickerOptions {
  id?: string;
  mode?: "read" | "readwrite";
  types?: FilePickerAcceptType[];
  excludeAcceptAllOption?: boolean;
  startIn?: FileSystemHandle | string;
}

interface FileSystemAccept {
  description?: string;
  accept: Record<string, string[]>;
}

interface FilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}

declare global {
  interface Window {
    showOpenFilePicker?: (options?: FilePickerOptions) => Promise<FileSystemFileHandle[]>;
    showSaveFilePicker?: (options?: FilePickerOptions) => Promise<FileSystemFileHandle>;
    showDirectoryPicker?: (options?: DirectoryPickerOptions) => Promise<FileSystemDirectoryHandle>;
  }
}

export {};
