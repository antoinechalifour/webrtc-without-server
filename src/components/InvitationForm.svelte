<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { InvitationToken } from '../domain/InvitationToken';
	import { copySessionUrlToClipboard } from '../session';

	export let offer: InvitationToken;
	let answer = '';

	const dispatch = createEventDispatcher();
	const handleSubmit = () => dispatch('answer', answer);
</script>

<button on:click={copySessionUrlToClipboard(offer)}>Get my link</button>
<form on:submit|preventDefault={handleSubmit}>
	<label for="answer">Paste answer here</label>
	<textarea id="answer" name="answer" bind:value={answer} />

	<button type="submit">Connect to remote peer</button>
</form>
