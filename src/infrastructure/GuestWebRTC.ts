import type {
	AvailableFile,
	Guest,
	OnFilesChangedCallback,
	OnFilesChangedCleanUp
} from '../domain/Guest';
import type { FileTransfer } from '../domain/FileTransfer';

type IncomingMessage = {
	type: 'availablefiles';
	files: AvailableFile[];
};

export class GuestWebRTC implements Guest {
	private listeners: OnFilesChangedCallback[] = [];

	constructor(private dataChannel: RTCDataChannel) {
		this.configureDataChannel();
	}

	request(fileId: string): Promise<FileTransfer> {
		this.dataChannel.send(fileId);
		return Promise.resolve(null as any);
	}

	sync(availableFiles: AvailableFile[]) {
		this.dataChannel.send(
			JSON.stringify({
				type: 'availablefiles',
				files: availableFiles
			})
		);
	}

	onFilesChanged(callback: OnFilesChangedCallback): OnFilesChangedCleanUp {
		this.listeners.push(callback);

		return () => (this.listeners = this.listeners.filter((listener) => listener !== callback));
	}

	private configureDataChannel() {
		this.dataChannel.addEventListener('message', (e) =>
			this.handleIncomingMessage(JSON.parse(e.data))
		);
	}

	private handleIncomingMessage(message: IncomingMessage) {
		switch (message.type) {
			case 'availablefiles':
				this.notifyFilesChanged(message.files);
		}
	}

	private notifyFilesChanged(files: AvailableFile[]) {
		this.listeners.forEach((listener) => listener(files));
	}
}
