<script>
	import { slugify } from "$lib/blog";
	import { DownloadURL, UploadTask } from "sveltefire";
  function generateRandomString() {
        return Math.random().toString(36).substring(2, 10);
    }
  /**
	 * @type {string}
	 */
  export let title;
  $: imageTitle = slugify(title) + "\/" + generateRandomString() + ".jpg";

	/**
	 * @type {File}
	 */
	let file;

  export let image;

  // @ts-ignore
  function chooseFile(e) {
    file = e.target.files[0];
  }
</script>

<div class="col-span-full">
  <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
  <div class="mt-2 flex items-center gap-x-3">
    <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
    </svg>
    <input type="file" on:change={chooseFile} />
    <label for="photo" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</label>
  </div>
</div>


{#if file}
  <UploadTask ref={imageTitle} data={file} let:progress let:snapshot>
    {#if snapshot?.state === "running"}
      {progress}% uploaded
    {/if}

    {#if snapshot?.state === "success"}
      <DownloadURL ref={snapshot?.ref} let:link>
        <!-- {image = link} -->
        <button type="button" on:click={() => image = link}>Upload</button>
      </DownloadURL>
    {/if}
  </UploadTask>
{/if}