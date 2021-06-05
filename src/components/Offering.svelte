<script lang="ts">
	import type { Guest } from '../domain/Guest';
	import { OffererWebRTC } from '../infrastructure/OffererWebRTC';

	import FileSharing from './FileSharing.svelte';
	import InvitationForm from './InvitationForm.svelte';

	const offerer = new OffererWebRTC();
	const invitationTokenReady = offerer.invite();

	let guest: Guest | null;

	const handleAnswer = async (e: CustomEvent<string>) => (guest = await offerer.accept(e.detail));
</script>

{#await invitationTokenReady}
	<p>Creating offer...</p>
{:then offer}
	{#if guest}
		<FileSharing {guest} />
	{:else}
		<InvitationForm {offer} on:answer={handleAnswer} />
	{/if}
{:catch err}
	<p>Error while creating offer</p>
{/await}
