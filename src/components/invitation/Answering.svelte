<script lang="ts">
	import { AnswererWebRTC } from '../../infrastructure/AnswererWebRTC';
	import type { Guest } from '../../domain/Guest';
	import FileSharing from '../filesharing/FileSharing.svelte';

	import JoiningForm from './JoiningForm.svelte';
	import HomePage from './HomePage.svelte';
	import HomePageLoader from './HomePageLoader.svelte';

	export let offerInvitationToken: string;

	let guest: Guest | null = null;

	const answerer = new AnswererWebRTC();
	const invitationTokenReady = answerer.join(offerInvitationToken);

	invitationTokenReady.then(() => answerer.onGuest()).then((theGuest) => (guest = theGuest));
</script>

{#if guest}
	<FileSharing {guest} />
{:else}
	<HomePage>
		{#await invitationTokenReady}
			<HomePageLoader />
		{:then answer}
			<JoiningForm {answer} />
		{/await}
	</HomePage>
{/if}
