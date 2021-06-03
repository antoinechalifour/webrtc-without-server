<script lang="ts" context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import Offering from '../components/Offering.svelte';
	import Answering from '../components/Answering.svelte';

	const searchParams = new URLSearchParams(location.search);
	const mode = searchParams.has('connect') ? ('answering' as const) : ('offering' as const);
</script>

{#if mode === 'offering'}
	<Offering />
{:else}
	<Answering />
{/if}
