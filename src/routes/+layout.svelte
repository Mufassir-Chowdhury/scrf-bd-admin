<script lang="ts">
	import PhotoPicker from '$lib/Form/PhotoPicker.svelte';
	import AddForm from '$lib/Form/AddForm.svelte';
	import FormField from '$lib/Form/FormField.svelte';

	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	import Signin from '../lib/SignIn.svelte';
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	//Firebase
	

	import { FirebaseApp, getFirebaseContext } from 'sveltefire';


	// Initialize Firebase
	
	import { SignedIn, SignedOut } from 'sveltefire';
	import DashBoard from '$lib/DashBoard.svelte';
	// import { getAnalytics } from "firebase/analytics";
	// const analytics = getAnalytics(app);

	import { storeExample } from './store';
	let storeExample_value = 0;
	storeExample.subscribe((value) => {
		storeExample_value = value;
	});

	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	import { postBlog } from '$lib/blog';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';

	let title = '';
	let author = '';
	let image = '';
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

	import TipTap from '$lib/TipTap.svelte';
	import { getStorage } from 'firebase/storage';
	import { getDatabase } from 'firebase/database';

	let divElement: HTMLDivElement;
</script>

<FirebaseApp {auth} {firestore} {storage} {rtdb}>
	<Drawer position="left">
		{#if $drawerStore.id === 'create blog'}
			<form on:submit|preventDefault={() => {postBlog(firestore, title, author, image, divElement); drawerStore.close(); title = ''; author = ''; image='';}} class="p-8 px-16 w-full">
				<AddForm>
					<FormField bind:value={title} name="Title" classValue="sm:col-span-3" />
					<FormField bind:value={author} name="Author" classValue="sm:col-span-4 col-start-1" />
					<FormField bind:value={image} disabled={true}  name="Image" classValue="sm:col-span-3" />
					<p class="text-green-600 sm:col-span-6">The link will be added after you upload your image</p>
					<PhotoPicker bind:title bind:image/>
					<p class="text-red-600 sm:col-span-6">Only upload photo after providing the final version of your title</p>
					<fieldset class="sm:col-span-6 ">
						<TipTap bind:title bind:element={divElement} />
					</fieldset>
				</AddForm>
			</form>
		{/if}
	</Drawer>

	<AppShell>
		<SignedIn let:user let:signOut>
			<div class="flex h-full w-full">
				<div class="static overflow-hidden">
					<DashBoard {signOut} />
				</div>
				<div class="w-full">
					<slot />
					<div class="prose text-white" bind:this={divElement} />

				</div>
			</div>
		</SignedIn>

		<SignedOut>
			<Signin />
		</SignedOut>
	</AppShell>
</FirebaseApp>
