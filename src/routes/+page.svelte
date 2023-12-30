<script lang="ts">
    import { deleteBlog } from '$lib/research';
	import { Collection, getFirebaseContext } from 'sveltefire';
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { storeExample } from './store';
    import { DateTime } from "luxon";
	import { collection, limit, orderBy, query } from 'firebase/firestore';

    

    const drawerStore = getDrawerStore();
    let heading = '';
    let drawerSetting = '';
    let ref = '';
	let storeExample_value: number = 0;
	
    storeExample.subscribe((value) => {
		storeExample_value = value;
        if(value == 0){
            heading = 'Blog';
            drawerSetting = 'Create Blog';
            ref = 'blogs';
        } else if(value == 1){
            heading = 'Research';
            drawerSetting = 'Create Research';
            ref = 'research';
        } else {
            heading = 'News';
            drawerSetting = 'Create News';
            ref = 'news';
        }
	});

    function openDrawer(title: string) {
        const settings = { id: title };
        drawerStore.open(settings);
    }

    const { firestore } = getFirebaseContext();
    
</script>
    
{#if firestore}
    <div class="p-8">
        <div class="flex justify-between">
            <h2 class="h2">
                {heading}
            </h2>
            <form on:submit|preventDefault={() => {openDrawer(drawerSetting)}}>
                <button type="submit" class="btn btn-primary">
                    <i class="fi fi-tr-square-plus"></i>
                </button>
            </form>
        </div>
        {#if heading == "Blog"}
            <Collection ref={query(collection(firestore, "blogs"), orderBy("date", "desc"))} let:data={blogs} let:count>
                <p>Found {count} items</p>
                {#each blogs as blog}
                    <div class="p-4 card card-hover variant-soft-surface my-4 flex justify-between">
                        <div class="flex flex-col">
                            <h3>
                                {blog.title}
                            </h3>
                            <subtitle>
                                {blog.author} |
                                {DateTime.fromMillis(blog.date.seconds * 1000).toLocaleString(DateTime.DATE_FULL)} 
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
        {:else if heading == "Research"}
            <Collection ref={query(collection(firestore, "research"), orderBy("date", "desc"), limit(2))} let:data={blogs} let:count>
                <p>Found {count} items</p>
                {#each blogs as blog}
                    <div class="p-4 card card-hover variant-soft-surface my-4 flex justify-between">
                        <div class="flex flex-col">
                            <h3>
                                {blog.title}
                            </h3>
                            <subtitle>
                                {blog.author} |
                                {DateTime.fromMillis(blog.date.seconds * 1000).toFormat('LLLL yyyy')} 
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
        {/if}
    </div>
{/if}


