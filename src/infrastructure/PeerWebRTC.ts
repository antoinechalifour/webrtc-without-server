export abstract class PeerWebRTC {
	protected collectIceCandidates(peerConnection: RTCPeerConnection) {
		return new Promise((resolve) => {
			peerConnection.addEventListener('icecandidate', (e) => {
				if (!e.candidate) resolve(void 0);
			});
		});
	}
}
