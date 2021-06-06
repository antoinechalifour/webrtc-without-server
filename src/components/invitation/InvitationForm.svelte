<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { InvitationToken } from '../../domain/InvitationToken';

	import PrimaryButton from '../ui/PrimaryButton.svelte';
	import Input from '../ui/Input.svelte';
	import InputToClipboard from '../ui/InputToClipboard.svelte';
	import Steps from './Steps.svelte';

	export let offer: InvitationToken;
	let answer = '';

	const dispatch = createEventDispatcher();
	const handleSubmit = () => dispatch('answer', answer);
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Steps>
		<li>
			<p>Step 1</p>
			<p>Copy and send the following url to your friend.</p>

			<InputToClipboard
				text={offer}
				formatContent={(offer) => `${location.origin}/?connect=${offer}`}
			/>
		</li>

		<li>
			<p>Step 2</p>
			<label for="answer">Paste here the code they will send as a reply</label>
			<Input
				type="text"
				id="answer"
				name="answer"
				placeholder="Code goes here"
				bind:value={answer}
			/>
		</li>

		<li>
			<p>Step 3</p>
			<PrimaryButton type="submit" disabled={!answer}>Share files</PrimaryButton>
		</li>
	</Steps>
</form>
