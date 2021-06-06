<script lang="ts">
	import type { InvitationToken } from '../../domain/InvitationToken';
	import { copySessionDescriptionToClipboard } from '../../session';

	export let answer: InvitationToken;
</script>

<button on:click={copySessionDescriptionToClipboard(answer)}>Get my link</button>
