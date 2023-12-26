<section>

    <fieldset class="mt-6 border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Details</h2>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <slot/>
        </div>
    </fieldset> 
    {#if $$slots.personal}
        <fieldset class="mt-6 border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <slot name="personal"/>
            </div>
        </fieldset>         
    {/if}
    <button type="submit">
        Create
    </button>
</section>
