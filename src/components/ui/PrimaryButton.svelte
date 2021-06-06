<script lang="ts">
	export let type: 'submit' | 'button' = 'button';
	export let disabled = false;
</script>

<button {type} {disabled}>
	<slot />
</button>

<style>
	button[type='submit'] {
		background-image: linear-gradient(45deg, dodgerblue, violet);
		border: none;
		border-radius: 1rem;
		padding: 1rem;
		font-family: inherit;
		color: #fff;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 1px;
		cursor: pointer;
		transition: transform 0.2s ease;
		transform: scale(1);
	}

	button[type='submit']:not(:disabled):hover {
		transform: scale(1.01);
	}

	button[type='submit']:disabled {
		cursor: not-allowed;
		opacity: 0.65;
	}
</style>
