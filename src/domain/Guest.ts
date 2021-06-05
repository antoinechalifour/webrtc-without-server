import type { FileTransfer } from './FileTransfer';

export interface AvailableFile {
	id: string;
	name: string;
}

export interface Guest {
	sync(availableFiles: AvailableFile[]): void;
	request(fileId: string): Promise<FileTransfer>;
}
