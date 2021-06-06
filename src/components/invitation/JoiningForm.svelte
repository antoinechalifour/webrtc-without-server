<script lang="ts">
	import type { InvitationToken } from '../../domain/InvitationToken';
	import InputToClipboard from '../ui/InputToClipboard.svelte';

	import Steps from './Steps.svelte';

	export let answer: InvitationToken;
</script>

<Steps>
	<li>
		<p>Step 1</p>
		<p>Copy your personal code and send it to your friend</p>
		<InputToClipboard text={answer} />
	</li>

	<li>
		<p>Step 2</p>
		<p>Wait for your friend to connect...</p>
	</li>
</Steps>
