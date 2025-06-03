<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>SvelteKit</title>
</svelte:head>

<Navbar />

<slot />
