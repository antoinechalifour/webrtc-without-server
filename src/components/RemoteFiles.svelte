<script lang="ts">
	import { onDestroy } from 'svelte';
	import GoCloudDownload from 'svelte-icons/go/GoCloudDownload.svelte';

	import type { AvailableFile, Guest } from '../domain/Guest';
	import FileList from './FileList.svelte';
	import AvailableFileItem from './AvailableFileItem.svelte';

	export let guest: Guest;
	let files: AvailableFile[] = [];

	const cleanUp = guest.onFilesChanged((newFiles) => (files = newFiles));

	onDestroy(cleanUp);
</script>

<div>
	<h2>Remote files</h2>
	<FileList>
		{#each files as file}
			<li>
				<AvailableFileItem name={file.name}>
					<button aria-label="Download file {file.name}">
						<GoCloudDownload />
					</button>
				</AvailableFileItem>
			</li>
		{/each}
	</FileList>
</div>
