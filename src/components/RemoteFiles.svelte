<script lang="ts">
	import { onDestroy } from 'svelte';
	import GoCloudDownload from 'svelte-icons/go/GoCloudDownload.svelte';

	import type { AvailableFile, Guest } from '../domain/Guest';
	import FileList from './FileList.svelte';
	import AvailableFileItem from './AvailableFileItem.svelte';

	export let guest: Guest;
	let files: AvailableFile[] = [];

	const cleanUp = guest.onFilesChanged((newFiles) => (files = newFiles));

	const downloadFileOnClick = (file: AvailableFile) => () => guest.request(file.id);

	onDestroy(cleanUp);
</script>

<div>
	<h2>Remote files</h2>
	<FileList>
		{#each files as file}
			<li>
				<AvailableFileItem name={file.name}>
					<button aria-label="Download file {file.name}" on:click={downloadFileOnClick(file)}>
						<GoCloudDownload />
					</button>
				</AvailableFileItem>
			</li>
		{/each}
	</FileList>
</div>
