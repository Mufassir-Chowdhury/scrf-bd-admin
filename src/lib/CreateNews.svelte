<script lang="ts">
	import PhotoPicker from '$lib/Form/PhotoPicker.svelte';
	import AddForm from '$lib/Form/AddForm.svelte';
	import FormField from '$lib/Form/FormField.svelte';

	import { getFirebaseContext } from 'sveltefire';


	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	import { postBlog } from '$lib/blog';
	let title = '';
	let author = '';
	let image = '';
    let date = '';
	const {firestore} = getFirebaseContext();

	import TipTap from '$lib/TipTap.svelte';

	let divElement: HTMLDivElement;
</script>

{#if firestore}
    <form on:submit|preventDefault={() => {postBlog(firestore, title, author, date, image, divElement); drawerStore.close(); title = ''; author = ''; image='';}} class="p-8 px-16 w-full">
        <AddForm>
            <FormField bind:value={title} name="Title" classValue="sm:col-span-3" />
            <FormField bind:value={author} name="Author" classValue="sm:col-span-4 col-start-1" />
            <label class="label sm:col-span-4">
                <span class="text-sm font-medium text-gray-900 leading-6">Date</span>
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input required type="date" bind:value={date} name="date" id="date" class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                </div>
            </label>
            <FormField bind:value={image} disabled={true} name="Image" classValue="sm:col-span-3" />
            <p class="text-green-600 sm:col-span-6">The link will be added after you upload your image</p>
            <PhotoPicker bind:title bind:image/>
            <p class="text-red-600 sm:col-span-6">Only upload photo after providing the final version of your title</p>
            <fieldset class="sm:col-span-6 ">
                <TipTap bind:title bind:element={divElement} />
            </fieldset>
        </AddForm>
    </form>
{/if}