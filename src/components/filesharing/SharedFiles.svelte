<script lang="ts">
	declare module 'svelte-file-dropzone';
	import Dropzone from 'svelte-file-dropzone';
	import GoX from 'svelte-icons/go/GoX.svelte';

	import type { AvailableFile, Guest } from '../../domain/Guest';

	import AvailableFileItem from './AvailableFileItem.svelte';
	import FileList from './FileList.svelte';

	export let guest: Guest;
	let files: File[] = [];

	const handleFilesSelect = (e: any) => {
		files = [...files, ...e.detail.acceptedFiles];
		guest.sync(files.map((file) => ({ id: file.name, name: file.name })));
	};

	const removeFileOnClick = (file: AvailableFile) => () =>
		(files = files.filter((x) => x !== file));
</script>

<div>
	<h2>Local files</h2>

	<Dropzone on:drop={handleFilesSelect} />

	<FileList>
		{#each files as file}
			<li>
				<AvailableFileItem name={file.name}>
					<button aria-label="Remove file {file.name}" on:click={removeFileOnClick(file)}>
						<GoX />
					</button>
				</AvailableFileItem>
			</li>
		{/each}
	</FileList>
</div>
