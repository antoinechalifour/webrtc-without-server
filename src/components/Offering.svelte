<script lang="ts">
	import { configuration } from '../rtc/config';
	import { copySessionUrlToClipboard } from '../session';

	async function createOfferer(): Promise<RTCPeerConnection> {
		console.log('Creating PeerConnection...');
		const peerConnection = new RTCPeerConnection(configuration);
		console.log('Creating DataChannel...');
		const dataChannel = peerConnection.createDataChannel('main');

		console.log('Waiting Ice Candidates...');
		const iceCandidatesReady = new Promise((resolve) => {
			peerConnection.addEventListener('icecandidate', (e) => {
				console.log('peerConnection:icecandidate', e);

				if (!e.candidate) resolve();
			});
		});

		console.log('Creating offer...');
		const offer = await peerConnection.createOffer();
		console.log('Setting local offer...');
		await peerConnection.setLocalDescription(offer);
		await iceCandidatesReady;

		dataChannel.addEventListener('open', (e) => {
			console.log('dataChannel:open', e);
			dataChannel.send('Hello world');
		});
		dataChannel.addEventListener('message', (e) => {
			console.log('dataChannel:message', e);
		});

		return peerConnection;
	}

	const peerConnectionCreated = createOfferer();

	const offerReady = peerConnectionCreated.then((peerConnection) =>
		btoa(JSON.stringify(peerConnection.localDescription))
	);

	let answer = '';
	const handleSubmit = () => {
		peerConnectionCreated.then((peerConnection) => {
			peerConnection.setRemoteDescription(JSON.parse(atob(answer)));
		});
	};
</script>

{#await offerReady}
	<p>Creating offer...</p>
{:then offer}
	<p>Offer created</p>
	<pre>{offer}</pre>
	<button on:click={copySessionUrlToClipboard(offer)}>Get my link</button>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="answer">Paste answer here</label>
		<textarea id="answer" name="answer" bind:value={answer} />

		<button type="submit">Connect to remote peer</button>
	</form>
{:catch err}
	<p>Error while creating offer</p>
{/await}
