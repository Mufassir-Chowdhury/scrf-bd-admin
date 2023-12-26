<script lang="ts">
    import { deleteBlog } from '$lib/blog';
	import { Collection, getFirebaseContext } from 'sveltefire';
    
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import type { DrawerSettings } from '@skeletonlabs/skeleton';

    const drawerStore = getDrawerStore();

    const settings: DrawerSettings = { id: 'create blog' };

    function openDrawer() {
        console.log("Opening drawer");
        drawerStore.open(settings);
    }

    const { firestore } = getFirebaseContext();
</script>
    

<div class="p-8">
    <div class="flex justify-between">
        <h2 class="h2">
            Blogs
        </h2>
        <form on:submit|preventDefault={() => openDrawer()}>
            <button type="submit" class="btn btn-primary">
                <i class="fi fi-tr-square-plus"></i>
            </button>
        </form>
    </div>
    <Collection ref="blogs" let:data={blogs} let:count>
        <p>Found {count} posts</p>
        {#each blogs as blog}
            <div class="p-4 card card-hover variant-soft-surface my-4 flex justify-between">
                <div class="flex flex-col">
                    <h3>
                        {blog.title}
                    </h3>
                    <subtitle>
                        {blog.author} |
                        {blog.date}
                    </subtitle>
                </div>
                <div>
                    <button class="btn btn-primary"><i class="fi fi-tr-file-edit"></i></button>
                    {#if firestore}
                        <form on:submit|preventDefault={() => deleteBlog(firestore, blog.title)}>
                            <button type="submit" class="btn btn-danger"><i class="fi fi-tr-delete-right"></i></button>
                        </form>
                    {/if}
                </div>
            </div>
        {/each}
        <p slot="loading">Loading...</p>
    </Collection>
</div>


