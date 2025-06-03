<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Svelte Learning</title>
</svelte:head>

<Navbar />

<slot />
