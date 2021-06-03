<script lang="ts">
	import { configuration } from '../rtc/config';
	import { copySessionDescriptionToClipbaord } from '../session';

	async function createAnswerer(offer: RTCSessionDescription): Promise<RTCPeerConnection> {
		console.log('Creating PeerConnection...');
		const peerConnection = new RTCPeerConnection(configuration);
		console.log('Setting Remote Description...');
		await peerConnection.setRemoteDescription(offer);

		console.log('Waiting for ice candidates...');
		const iceCandidatesReady = new Promise((resolve) => {
			peerConnection.addEventListener('icecandidate', (e) => {
				console.log('answering:peerConnection:icecandidate', e);

				if (!e.candidate) resolve();
			});
		});

		const answer = await peerConnection.createAnswer();
		await peerConnection.setLocalDescription(answer);
		await iceCandidatesReady;

		peerConnection.addEventListener('datachannel', (e: RTCDataChannelEvent) => {
			console.log('answering:peerConnection:datachannel', e);
			const dataChannel = e.channel;
			dataChannel.addEventListener('message', (data) => {
				console.log('datachannel:message:', data);
				dataChannel.send('Thanks dude');
			});
		});

		return peerConnection;
	}

	const searchParams = new URLSearchParams(location.search);
	const peerConnectionCreated = createAnswerer(JSON.parse(atob(searchParams.get('connect'))));

	const answerReady = peerConnectionCreated.then((peerConnection) =>
		btoa(JSON.stringify(peerConnection.localDescription))
	);
</script>

{#await answerReady}
	<p>Creating answer</p>
{:then answer}
	<p>Answer created</p>
	<pre>{answer}</pre>
	<button on:click={copySessionDescriptionToClipbaord(answer)}>Get my link</button>
{/await}
