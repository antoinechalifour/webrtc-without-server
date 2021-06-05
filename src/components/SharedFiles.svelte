<script lang="ts">
	declare module 'svelte-file-dropzone';
	import Dropzone from 'svelte-file-dropzone';

	import type { Guest } from '../domain/Guest';

	export let guest: Guest;
	let files: File[] = [];

	const handleFilesSelect = (e: any) => {
		files = [...files, ...e.detail.acceptedFiles];
		guest.sync(files.map((file) => ({ id: file.name, name: file.name })));
	};
</script>

<h2>Local files</h2>

<Dropzone on:drop={handleFilesSelect} />

<ul>
	{#each files as file}
		<li>{file.name}</li>
	{/each}
</ul>
