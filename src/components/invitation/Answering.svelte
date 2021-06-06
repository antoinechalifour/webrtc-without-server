<script lang="ts">
	import { AnswererWebRTC } from '../../infrastructure/AnswererWebRTC';
	import FileSharing from '../filesharing/FileSharing.svelte';
	import JoiningForm from './JoiningForm.svelte';

	export let offerInvitationToken: string;

	const answerer = new AnswererWebRTC();
	const invitationTokenReady = answerer.join(offerInvitationToken);
</script>

{#await invitationTokenReady}
	<p>Creating answer</p>
{:then answer}
	{#await answerer.onGuest()}
		<JoiningForm {answer} />
	{:then guest}
		<FileSharing {guest} />
	{/await}
{/await}
