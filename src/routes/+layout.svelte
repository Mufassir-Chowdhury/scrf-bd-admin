<script lang="ts">
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	import Signin from '../lib/SignIn.svelte';
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	
	// Initialize Firebase
	import { FirebaseApp } from 'sveltefire';
	import { SignedIn, SignedOut } from 'sveltefire';
	import DashBoard from '$lib/DashBoard.svelte';
	// import { getAnalytics } from "firebase/analytics";
	// const analytics = getAnalytics(app);

	

	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { getStorage } from 'firebase/storage';
	import { getDatabase } from 'firebase/database';

	const firebaseConfig = {
		apiKey: "AIzaSyAw9-SSj6Pnu1P5pvq6GnukOX_1vC7EdfQ",
		authDomain: 'scrf-bd.firebaseapp.com',
		projectId: 'scrf-bd',
		storageBucket: 'scrf-bd.appspot.com',
		messagingSenderId: '327629050530',
		appId: '1:327629050530:web:1b75d53fdd606e5c447dfb',
		measurementId: 'G-Y0HH5CQFTT'
	};

	let app = initializeApp(firebaseConfig);
	let firestore = getFirestore(app);
	let auth = getAuth(app);
	let storage = getStorage(app);
	let rtdb = getDatabase(app);

	import CreateBlog from '$lib/CreateBlog.svelte';
	import CreateResearch from '$lib/CreateResearch.svelte';
	import CreateNews from '$lib/CreateNews.svelte';
</script>
<FirebaseApp {auth} {firestore} {storage} {rtdb}>
	<Modal />
	<Drawer position="left">
		<h3 class="h3 block p-8">{$drawerStore.id}</h3>
		{#if $drawerStore.id === 'Create Blog'}
			<CreateBlog />
		{:else if $drawerStore.id === 'Create Research'}
			<CreateResearch />
		{:else if $drawerStore.id === 'Create News'}
			<CreateNews />
		{/if}
	</Drawer>

	<AppShell>
		<SignedIn let:user let:signOut>
			<div class="flex h-full w-full">
				<div class="static overflow-hidden">
					<DashBoard {signOut} />
				</div>
				<div class="w-full">
					<slot storeExample_value/>
				</div>
			</div>
		</SignedIn>

		<SignedOut>
			<Signin />
		</SignedOut>
	</AppShell>
</FirebaseApp>
