import type { FileTransfer } from './FileTransfer';

export interface AvailableFile {
	id: string;
	name: string;
}

export type OnFilesChangedCallback = (availableFiles: AvailableFile[]) => void;
export type OnFilesChangedCleanUp = () => void;

export interface Guest {
	sync(availableFiles: AvailableFile[]): void;
	request(fileId: string): Promise<FileTransfer>;
	onFilesChanged(callback: OnFilesChangedCallback): OnFilesChangedCleanUp;
}
