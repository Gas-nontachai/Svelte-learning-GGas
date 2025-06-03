<script lang="ts">
	import type { User } from '$lib/types/user';
	import { formatDate } from '$lib/utils/date';

	export let user: User;
	export let onClose = () => {};

	// Generate avatar initials
	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((word) => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};
</script>

<main class="fixed inset-0 z-50 flex items-center justify-center p-4">
	<!-- Backdrop with blur effect -->
	<button
		type="button"
		class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
		aria-label="Close modal backdrop"
		on:click={onClose}
	></button>

	<!-- Modal Container -->
	<div class="relative z-50 w-full max-w-2xl transform transition-all duration-300 ease-out">
		<!-- Modal Content -->
		<div
			class="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5"
			style="background-color: #F5F5F5;"
		>
			<!-- Header -->
			<div
				class="border-b px-6 py-6"
				style="border-color: #4DA8DA20; background: linear-gradient(135deg, #4DA8DA10, #80D8C310);"
			>
				<div class="flex items-center gap-4">
					<!-- Avatar -->
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white shadow-lg"
						style="background: linear-gradient(135deg, #4DA8DA, #80D8C3);"
					>
						{getInitials(user.name)}
					</div>

					<!-- User Info -->
					<div class="flex-1">
						<h2 class="text-2xl font-bold" style="color: #333;">{user.name}</h2>
						<p class="mt-1 text-sm" style="color: #666;">User ID: #{user.user_id}</p>
						<div class="mt-2 flex items-center gap-1">
							<span
								class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
								style="background-color: #80D8C320; color: #333;"
							>
								<div class="mr-1 h-2 w-2 rounded-full" style="background-color: #80D8C3;"></div>
								Active
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Body -->
			<div class="px-6 py-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<!-- Contact Information -->
					<div class="space-y-4">
						<h3 class="flex items-center gap-2 text-lg font-semibold" style="color: #333;">
							<svg
								class="h-5 w-5"
								style="color: #4DA8DA;"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							Contact Information
						</h3>

						<!-- Email -->
						<div
							class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:opacity-80"
							style="background-color: #4DA8DA15;"
						>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full"
								style="background-color: #4DA8DA20;"
							>
								<svg
									class="h-4 w-4"
									style="color: #4DA8DA;"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-sm font-medium" style="color: #333;">Email</p>
								<p class="text-sm break-all" style="color: #666;">{user.email}</p>
							</div>
						</div>

						<!-- Phone -->
						<div
							class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:opacity-80"
							style="background-color: #80D8C315;"
						>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full"
								style="background-color: #80D8C320;"
							>
								<svg
									class="h-4 w-4"
									style="color: #80D8C3;"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-sm font-medium" style="color: #333;">Phone</p>
								<p class="text-sm" style="color: #666;">{user.tel}</p>
							</div>
						</div>
					</div>

					<!-- Account Information -->
					<div class="space-y-4">
						<h3 class="flex items-center gap-2 text-lg font-semibold" style="color: #333;">
							<svg
								class="h-5 w-5"
								style="color: #4DA8DA;"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							Account Details
						</h3>

						<!-- Registration Date -->
						<div
							class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:opacity-80"
							style="background-color: #FFD66B15;"
						>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full"
								style="background-color: #FFD66B30;"
							>
								<svg
									class="h-4 w-4"
									style="color: #CC9900;"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-sm font-medium" style="color: #333;">Registration Date</p>
								<p class="text-sm" style="color: #666;">
									{formatDate(user.add_date, 'YYYY-MM-DD HH:mm')}
								</p>
							</div>
						</div>

						<!-- Account Stats -->
						<div class="grid grid-cols-2 gap-3">
							<div
								class="rounded-lg p-3 text-center"
								style="background: linear-gradient(135deg, #4DA8DA15, #4DA8DA10);"
							>
								<div class="text-2xl font-bold" style="color: #4DA8DA;">0</div>
								<div class="text-xs" style="color: #666;">Orders</div>
							</div>
							<div
								class="rounded-lg p-3 text-center"
								style="background: linear-gradient(135deg, #80D8C315, #80D8C310);"
							>
								<div class="text-2xl font-bold" style="color: #80D8C3;">0</div>
								<div class="text-xs" style="color: #666;">Points</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div
				class="flex items-center justify-between px-6 py-4"
				style="background-color: #F5F5F5; border-top: 1px solid #4DA8DA20;"
			>
				<button
					type="button"
					on:click={onClose}
					class="rounded-lg border px-6 py-2 text-sm font-medium transition-colors duration-200 hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					style="border-color: #4DA8DA40; background-color: white; color: #333; --tw-ring-color: #4DA8DA;"
				>
					Close
				</button>
			</div>

			<!-- Close button (X) -->
			<button
				type="button"
				on:click={onClose}
				class="absolute top-4 right-4 rounded-full p-2 backdrop-blur-sm transition-colors duration-200 hover:opacity-80 focus:ring-2 focus:outline-none"
				style="color: #666; --tw-ring-color: #4DA8DA;"
				aria-label="Close modal"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</div>
</main>

<style>
	/* Animation entrance */
	main {
		animation: fadeIn 0.3s ease-out;
	}

	main > div {
		animation: slideUp 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
