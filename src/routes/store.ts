import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
export const storeExample: Writable<number> = localStorageStore('storeExample', 0);
