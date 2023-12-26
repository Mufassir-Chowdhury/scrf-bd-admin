<script lang="ts">
	import { focusTrap } from "@skeletonlabs/skeleton";
    let isFocused: boolean = true;

    import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
    import { getFirebaseContext } from 'sveltefire';

    const { auth, firestore, storage } = getFirebaseContext();

    let email = '';
    let password = '';

    async function signInWithEmail() {
        try {
            if (auth) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                console.error("Auth is undefined.");
            }
        } catch (error) {
            console.error('Error signing in with email and password', error);
        }
    }
</script>

<div class="h-full w-full flex justify-center items-center">
    <form use:focusTrap={isFocused} class="card card-hover px-8 py-6 space-y-6" on:submit|preventDefault={signInWithEmail}>
        <header class="card-header h2 bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
                <h2 class="mt-10 text-center">SCRF-BD-ADMIN</h2>
            </div>
            
        </header>
        <section class="p-4 space-y-6 w-full mx-auto text-sm">
            <label class="label">
                <span>Email</span>
                <input class="input py-1.5 shadow-sm" bind:value={email} type="email" placeholder="Email" />
            </label>
            <label class="label">
                <span>Password</span>
                <input class="input py-1.5 shadow-sm" bind:value={password} type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
            </label>
        </section>
    	<footer class="card-footer">
            <button class="btn variant-filled-primary py-1.5 w-full">Sign In</button>
        </footer>
    </form>
</div>