import type { AvailableFile, Guest } from '../domain/Guest';
import type { FileTransfer } from '../domain/FileTransfer';

export class GuestWebRTC implements Guest {
	constructor(private dataChannel: RTCDataChannel) {
		this.configureDataChannel();
	}

	request(fileId: string): Promise<FileTransfer> {
		this.dataChannel.send(fileId);
		return Promise.resolve(null as any);
	}

	private configureDataChannel() {
		this.dataChannel.addEventListener('message', (e) => {
			console.log('New message:', e);
		});
	}

	sync(availableFiles: AvailableFile[]) {
		this.dataChannel.send(
			JSON.stringify({
				type: 'availablefiles',
				files: availableFiles
			})
		);
	}
}
