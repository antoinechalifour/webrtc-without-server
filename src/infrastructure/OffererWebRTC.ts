import type { Offerer } from '../domain/Offerer';
import type { Guest } from '../domain/Guest';
import type { InvitationToken } from '../domain/InvitationToken';
import { isDefined } from '../utils/lib';

import { makeInvitationToken, parseInvitationToken } from './InvitationTokenWebRTC';
import { GuestWebRTC } from './GuestWebRTC';
import { webRTCConfiguration } from './WebRTCConfiguration';
import { PeerWebRTC } from './PeerWebRTC';

export class OffererWebRTC extends PeerWebRTC implements Offerer {
	private peerConnection?: RTCPeerConnection;
	private dataChannel?: RTCDataChannel;

	async invite(): Promise<InvitationToken> {
		this.peerConnection = new RTCPeerConnection(webRTCConfiguration);
		this.dataChannel = this.peerConnection.createDataChannel('main');

		const iceCandidatesReady = this.collectIceCandidates(this.peerConnection);
		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(offer);
		await iceCandidatesReady;

		return makeInvitationToken(this.peerConnection.localDescription!);
	}

	async accept(token: InvitationToken): Promise<Guest> {
		isDefined(this.peerConnection);
		isDefined(this.dataChannel);

		const sessionDescription = parseInvitationToken(token);
		await this.peerConnection.setRemoteDescription(sessionDescription);

		return new GuestWebRTC(this.dataChannel);
	}
}
