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

<nav class="sticky top-0 z-50 border-b border-[#80D8C3]/30 bg-[#4DA8DA] shadow-sm">
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex h-14 items-center justify-between">
			<!-- Brand -->
			<div class="text-xl font-semibold text-[#F5F5F5]">MyApp</div>

			<!-- Navigation Links -->
			<div class="flex space-x-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200
							{$currentPath === item.href
							? 'bg-[#FFD66B] text-[#4DA8DA]'
							: 'text-[#F5F5F5] hover:bg-[#80D8C3]/20'}"
						aria-current={$currentPath === item.href ? 'page' : undefined}
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>
