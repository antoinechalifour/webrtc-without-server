export type OnCompleteCallback = (file: any) => void;

export interface FileTransfer {
	onComplete(callback: OnCompleteCallback): void;
}
