import type { Answerer } from '../domain/Answerer';
import type { Guest } from '../domain/Guest';
import type { InvitationToken } from '../domain/InvitationToken';

import { webRTCConfiguration } from './WebRTCConfiguration';
import { makeInvitationToken, parseInvitationToken } from './InvitationTokenWebRTC';
import { GuestWebRTC } from './GuestWebRTC';
import { isDefined } from '../utils/lib';

export class AnswererWebRTC implements Answerer {
	private dataChannelReady?: Promise<RTCDataChannel>;

	async join(token: InvitationToken): Promise<InvitationToken> {
		const peerConnection = new RTCPeerConnection(webRTCConfiguration);
		await peerConnection.setRemoteDescription(parseInvitationToken(token));

		const iceCandidatesReady = this.collectIceCandidates(peerConnection);
		this.dataChannelReady = this.listenForDataChannel(peerConnection);
		const answer = await peerConnection.createAnswer();
		await peerConnection.setLocalDescription(answer); // Necessary ?
		await iceCandidatesReady;

		return makeInvitationToken(peerConnection.localDescription!);
	}

	async onGuest(): Promise<Guest> {
		isDefined(this.dataChannelReady);
		const dataChannel = await this.dataChannelReady;

		return new GuestWebRTC(dataChannel);
	}

	// TODO: base class
	private collectIceCandidates(peerConnection: RTCPeerConnection) {
		return new Promise((resolve) => {
			peerConnection.addEventListener('icecandidate', (e) => {
				if (!e.candidate) resolve(void 0);
			});
		});
	}

	private listenForDataChannel(peerConnection: RTCPeerConnection): Promise<RTCDataChannel> {
		return new Promise((resolve) => {
			peerConnection.addEventListener('datachannel', (e) => {
				resolve(e.channel);
			});
		});
	}
}
