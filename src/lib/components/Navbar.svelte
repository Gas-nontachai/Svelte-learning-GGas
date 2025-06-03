<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	// สร้าง store สำหรับ path ปัจจุบัน
	const currentPath = derived(page, ($page) => $page.url.pathname);

	// เมนู
	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<nav class="bg-gray-800 p-4 text-white">
	<ul class="flex space-x-6">
		{#each navItems as item}
			<li>
				<a
					href={item.href}
					class="hover:text-yellow-300"
					class:selected={$currentPath === item.href ? 'text-yellow-400 font-bold' : ''}
					aria-current={$currentPath === item.href ? 'page' : undefined}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	a.selected {
		/* เน้นลิงก์ปัจจุบัน */
		color: #fbbf24; /* yellow-400 */
		font-weight: 700;
		border-bottom: 2px solid #fbbf24;
	}
</style>
