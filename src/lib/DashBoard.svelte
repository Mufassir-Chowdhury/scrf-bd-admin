<script lang="ts">
    import { AppRail, AppRailTile, AppRailAnchor, LightSwitch } from '@skeletonlabs/skeleton';
    let currentTile: number = 0;
    import { storeExample } from '../routes/store';

    $: storeExample.set(currentTile);
    export let signOut: () => Promise<void>;
</script>


<AppRail>
	<!-- <svelte:fragment slot="lead">
		<AppRailAnchor href="/" >(icon)</AppRailAnchor>
	</svelte:fragment> -->
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 1</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 2</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 3</span>
	</AppRailTile>
    <AppRailAnchor><LightSwitch /></AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/"  title="Account">
        	<button on:click={signOut}>
				(icon)
			</button>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
