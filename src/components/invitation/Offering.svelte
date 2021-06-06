<script lang="ts">
	import type { Guest } from '../../domain/Guest';
	import { OffererWebRTC } from '../../infrastructure/OffererWebRTC';

	import FileSharing from '../filesharing/FileSharing.svelte';
	import InvitationForm from './InvitationForm.svelte';
	import HomePage from './HomePage.svelte';
	import HomePageLoader from './HomePageLoader.svelte';

	const offerer = new OffererWebRTC();
	const invitationTokenReady = offerer.invite();

	let guest: Guest | null;

	const handleAnswer = async (e: CustomEvent<string>) => (guest = await offerer.accept(e.detail));
</script>

{#if guest}
	<FileSharing {guest} />
{:else}
	<HomePage>
		{#await invitationTokenReady}
			<HomePageLoader />
		{:then offer}
			<InvitationForm {offer} on:answer={handleAnswer} />
		{:catch err}
			<p>Error while creating offer</p>
		{/await}
	</HomePage>
{/if}
