<script lang="ts">
	import useUser from '$lib/hooks/useUsers';
	import { onMount } from 'svelte';
	import type { User } from '$lib/types/user';
	import Swal from 'sweetalert2';
	import { slide } from 'svelte/transition';
	import { formatDate } from '$lib/utils/date';
	import ProfileDialog from '$lib/components/ProfileDialog.svelte';

	const { getUserBy, insertUser, updateUserBy, deleteUserBy } = useUser();

	let users: User[] = [];
	let loading = false;
	let showProfileDialog = false;
	let error: string | null = null;

	// ฟอร์มเพิ่ม/แก้ไข
	let editingUser: User | null = null;
	let showForm = false;

	// โหลด users จาก API
	const fetchData = async () => {
		loading = true;
		error = null;
		try {
			const res = await getUserBy();
			users = res;
		} catch (e: any) {
			error = e.message;
			await Swal.fire({
				icon: 'error',
				title: 'เกิดข้อผิดพลาด',
				text: e.message
			});
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		fetchData();
	});

	// สร้าง user ใหม่ (POST)
	const createUser = async (user: Omit<User, 'user_id' | 'add_date'>) => {
		loading = true;
		try {
			const newUser = {
				...user,
				user_id: 0,
				add_date: new Date()
			};

			await insertUser(newUser);
			await Swal.fire({
				icon: 'success',
				title: 'สำเร็จ!',
				text: 'เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว',
				showConfirmButton: false,
				timer: 1500
			});
			closeForm();
			fetchData();
		} catch (e: any) {
			await Swal.fire({
				icon: 'error',
				title: 'เกิดข้อผิดพลาด',
				text: e.message
			});
		} finally {
			loading = false;
		}
	};

	const updateUser = async (user: User) => {
		try {
			await updateUserBy(user);
			await Swal.fire({
				icon: 'success',
				title: 'อัปเดตสำเร็จ!',
				text: 'แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว',
				showConfirmButton: false,
				timer: 1500
			});
			closeForm();
			fetchData();
		} catch (e: any) {
			await Swal.fire({
				icon: 'error',
				title: 'เกิดข้อผิดพลาด',
				text: e.message
			});
		}
	};

	// ลบ user (DELETE)
	const deleteUser = async (user_id: number) => {
		const result = await Swal.fire({
			title: 'ต้องการลบผู้ใช้นี้?',
			text: 'การดำเนินการนี้ไม่สามารถย้อนกลับได้!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#4DA8DA',
			confirmButtonText: 'ใช่, ลบเลย!',
			cancelButtonText: 'ยกเลิก'
		});

		if (result.isConfirmed) {
			try {
				await deleteUserBy(user_id);
				await Swal.fire({
					icon: 'success',
					title: 'ลบสำเร็จ!',
					text: 'ลบผู้ใช้เรียบร้อยแล้ว',
					showConfirmButton: false,
					timer: 1500
				});
				fetchData();
			} catch (e: any) {
				await Swal.fire({
					icon: 'error',
					title: 'เกิดข้อผิดพลาด',
					text: e.message
				});
			}
		}
	};

	// ฟังก์ชันเรียกใช้งานฟอร์มเพิ่ม/แก้ไข
	const startCreate = () => {
		editingUser = {
			user_id: 0,
			name: '',
			email: '',
			tel: '',
			add_date: new Date()
		};
		showForm = true;
	};

	const startEdit = (user: User) => {
		editingUser = { ...user };
		showForm = true;
	};

	const closeForm = () => {
		editingUser = null;
		showForm = false;
	};

	const toggleForm = () => {
		if (showForm && editingUser) {
			closeForm();
		} else {
			startCreate();
		}
	};

	const submitForm = async () => {
		if (!editingUser) return;

		if (!editingUser.user_id) {
			// สร้างใหม่
			await createUser({
				name: editingUser.name,
				email: editingUser.email,
				tel: editingUser.tel
			});
		} else {
			// แก้ไข
			await updateUser(editingUser);
		}
	};
	const openProfileDialog = (user: User) => {
		editingUser = user;
		showProfileDialog = true;
	};
</script>

<main class="min-h-screen p-6" style="background-color: #F5F5F5;">
	<div class="mx-auto max-w-6xl">
		<div class="mb-6 rounded-lg bg-white p-6 shadow-md">
			<h1 class="mb-6 flex items-center text-3xl font-bold text-gray-800">
				<svg
					class="mr-3 h-8 w-8"
					style="color: #4DA8DA;"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
					></path>
				</svg>
				จัดการ Users
			</h1>

			<!-- Form Toggle Button -->
			<div class="mb-6">
				<button
					on:click={toggleForm}
					class="flex items-center rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
					style="background-color: #4DA8DA;"
				>
					<svg
						class="mr-2 h-5 w-5 transition-transform duration-200 {showForm ? 'rotate-45' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						></path>
					</svg>
					{showForm ? 'ปิดฟอร์ม' : 'สร้าง User ใหม่'}
				</button>
			</div>

			<!-- Collapsible Form -->
			{#if showForm && editingUser}
				<div
					class="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
					transition:slide={{ duration: 200 }}
				>
					<div class="px-6 py-4" style="background-color: #80D8C3;">
						<h3 class="flex items-center text-xl font-semibold text-white">
							<svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								></path>
							</svg>
							{editingUser.user_id ? 'แก้ไข User' : 'สร้าง User ใหม่'}
						</h3>
					</div>

					<form on:submit|preventDefault={submitForm} class="space-y-4 p-6">
						<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
							<div>
								<label for="user-name" class="mb-2 block text-sm font-medium text-gray-700">
									ชื่อ <span class="text-red-500">*</span>
								</label>
								<input
									id="user-name"
									type="text"
									bind:value={editingUser.name}
									required
									class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
									placeholder="กรอกชื่อ"
								/>
							</div>

							<div>
								<label for="user-email" class="mb-2 block text-sm font-medium text-gray-700">
									อีเมล <span class="text-red-500">*</span>
								</label>
								<input
									id="user-email"
									type="email"
									bind:value={editingUser.email}
									required
									class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
									placeholder="กรอกอีเมล"
								/>
							</div>

							<div>
								<label for="user-tel" class="mb-2 block text-sm font-medium text-gray-700">
									เบอร์โทร
								</label>
								<input
									id="user-tel"
									type="tel"
									bind:value={editingUser.tel}
									class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
									placeholder="กรอกเบอร์โทร"
								/>
							</div>
						</div>

						<div class="flex space-x-3 pt-4">
							<button
								type="submit"
								disabled={loading}
								class="flex items-center justify-center rounded-md px-6 py-3 font-semibold text-white disabled:opacity-50"
								style="background-color: #80D8C3;"
							>
								{#if loading}
									<div class="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
								{:else}
									<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								{/if}
								บันทึก
							</button>
							<button
								type="button"
								on:click={closeForm}
								class="flex items-center justify-center rounded-md bg-gray-500 px-6 py-3 font-semibold text-white hover:bg-gray-600"
							>
								<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
								ยกเลิก
							</button>
						</div>
					</form>
				</div>
			{/if}

			{#if loading}
				<div class="flex items-center justify-center py-12">
					<div
						class="h-12 w-12 animate-spin rounded-full border-b-2"
						style="border-color: #4DA8DA;"
					></div>
					<p class="ml-4 text-lg text-gray-600">กำลังโหลดข้อมูล...</p>
				</div>
			{:else if error}
				<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
					<div class="flex items-center">
						<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clip-rule="evenodd"
							></path>
						</svg>
						{error}
					</div>
				</div>
			{:else}
				<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead style="background-color: #F5F5F5;">
								<tr>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase"
										>ชื่อ</th
									>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase"
										>อีเมล</th
									>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase"
										>เบอร์โทร</th
									>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase"
										>เพิ่มเมื่อ</th
									>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase"
										>การจัดการ</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each users as user, index}
									<tr class="hover:bg-gray-50">
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="h-10 w-10 flex-shrink-0">
													<button on:click={() => openProfileDialog(user)} class="cursor-pointer">
														<div
															class="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white"
															style="background-color: #4DA8DA;"
														>
															{user.name.charAt(0).toUpperCase()}
														</div>
													</button>
												</div>
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">{user.name}</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">{user.email}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">{user.tel}</div>
										</td>
										<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
											{formatDate(user.add_date, 'YYYY-MM-DD HH:mm')}
										</td>
										<td class="space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap">
											<button
												on:click={() => startEdit(user)}
												class="inline-flex items-center space-x-1 rounded-md px-4 py-2 text-white hover:opacity-90"
												style="background-color: #FFD66B; color: #333;"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
													></path>
												</svg>
												<span>แก้ไข</span>
											</button>
											<button
												on:click={() => deleteUser(user.user_id)}
												class="inline-flex items-center space-x-1 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													></path>
												</svg>
												<span>ลบ</span>
											</button>
										</td>
									</tr>
								{/each}
								{#if users.length === 0}
									<tr>
										<td colspan="5" class="px-6 py-8 text-center text-gray-500">
											<div class="flex flex-col items-center">
												<svg
													class="mb-4 h-12 w-12 text-gray-300"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
													></path>
												</svg>
												<p class="text-lg">ไม่มีข้อมูลผู้ใช้</p>
												<p class="text-sm">เริ่มต้นโดยการเพิ่มผู้ใช้ใหม่</p>
											</div>
										</td>
									</tr>
								{/if}
							</tbody>
						</table>
					</div>
				</div>
			{/if}

			{#if showProfileDialog && editingUser}
				<ProfileDialog user={editingUser} onClose={() => (showProfileDialog = false)} />
			{/if}
		</div>
	</div>
</main>
