import type { Answerer } from '../domain/Answerer';
import type { Guest } from '../domain/Guest';
import type { InvitationToken } from '../domain/InvitationToken';
import { isDefined } from '../utils/lib';

import { webRTCConfiguration } from './WebRTCConfiguration';
import { makeInvitationToken, parseInvitationToken } from './InvitationTokenWebRTC';
import { GuestWebRTC } from './GuestWebRTC';
import { PeerWebRTC } from './PeerWebRTC';

export class AnswererWebRTC extends PeerWebRTC implements Answerer {
	private dataChannelReady?: Promise<RTCDataChannel>;

	async join(token: InvitationToken): Promise<InvitationToken> {
		const peerConnection = new RTCPeerConnection(webRTCConfiguration);
		await peerConnection.setRemoteDescription(parseInvitationToken(token));

		const iceCandidatesReady = this.collectIceCandidates(peerConnection);
		this.dataChannelReady = this.listenForDataChannel(peerConnection);
		const answer = await peerConnection.createAnswer();
		await peerConnection.setLocalDescription(answer);
		await iceCandidatesReady;

		return makeInvitationToken(peerConnection.localDescription!);
	}

	async onGuest(): Promise<Guest> {
		isDefined(this.dataChannelReady);
		const dataChannel = await this.dataChannelReady;

		return new GuestWebRTC(dataChannel);
	}

	private listenForDataChannel(peerConnection: RTCPeerConnection): Promise<RTCDataChannel> {
		return new Promise((resolve) => {
			peerConnection.addEventListener('datachannel', (e) => {
				resolve(e.channel);
			});
		});
	}
}
