<script lang="ts">
  import './styles.scss';
  import StarterKit from "@tiptap/starter-kit";
  import { Editor } from "@tiptap/core";
  import { onMount } from "svelte";
  import Image from '@tiptap/extension-image';
  import Link from '@tiptap/extension-link';

  export let title: string;
  export let element: HTMLDivElement;
  let editor: Editor;

  

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit,Image,Link],
      content: `
            <h2>
              Hi there,
            </h2>
            <p>
              this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
            </p>
            <ul>
              <li>
                That’s a bullet list with one …
              </li>
              <li>
                … or two list items.
              </li>
            </ul>
            <p>
              Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
            </p>
            <pre><code class="language-css">body {
        display: none;
      }</code></pre>
            <p>
              I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
            </p>
            <blockquote>
              Wow, that’s amazing. Good work, boy! 👏
              <br />
              — Mom
            </blockquote>
          `,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  });
</script>
<span class="text-sm font-medium text-gray-900 leading-6">Content</span>

<div class="w-1/2 ring-1 ring-inset ring-gray-400 p-2 rounded-lg divide-y-2">

  {#if editor}
    <div class="">
      <div class="grid grid-cols-12 text-center justify-items-center">
        <div class="h-full w-full border">
          <button
            on:click={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            class={editor.isActive("bold") ? "is-active" : ""}
          >
            <p class="font-bold">B</p>
          </button>
        </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          class={editor.isActive("italic") ? "is-active" : ""}
        >
          <p class="italic">I</p>
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          class={editor.isActive("strike") ? "is-active" : ""}
        >
          <p class="line-through">S</p>
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          class={editor.isActive("code") ? "is-active" : ""}
        >
        &#9001/&#9002
        </button>
      </div>
      <div class="h-full w-full border">
        <button on:click={() => editor.chain().focus().unsetAllMarks().run()}> clear marks </button>
      </div>
      <div class="h-full w-full border">
        <button on:click={() => editor.chain().focus().clearNodes().run()}> clear nodes </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().setParagraph().run()}
          class={editor.isActive("paragraph") ? "is-active" : ""}
        >
          P
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          class={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        >
          H1
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          class={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        >
          H2
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        >
          H3
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          class={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        >
          H4
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          class={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        >
          H5
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          class={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        >
          H6
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleBulletList().run()}
          class={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <svg  class=" fill-black dark:fill-white" width="19px" height="19px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>bullet-list-line</title>
              <circle cx="5.21" cy="9.17" r="2" class="clr-i-outline clr-i-outline-path-1"></circle><circle cx="5.21" cy="17.17" r="2" class="clr-i-outline clr-i-outline-path-2"></circle><circle cx="5.21" cy="25.17" r="2" class="clr-i-outline clr-i-outline-path-3"></circle><path d="M32.42,9a1,1,0,0,0-1-1H10v2H31.42A1,1,0,0,0,32.42,9Z" class="clr-i-outline clr-i-outline-path-4"></path><path d="M31.42,16H10v2H31.42a1,1,0,0,0,0-2Z" class="clr-i-outline clr-i-outline-path-5"></path><path d="M31.42,24H10v2H31.42a1,1,0,0,0,0-2Z" class="clr-i-outline clr-i-outline-path-6"></path>
              <rect x="0" y="0" width="4" height="4" fill-opacity="0"/>
          </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleOrderedList().run()}
          class={editor.isActive("orderedList") ? "is-active" : ""}
        >
        <svg class="fill-black dark:fill-white" width="17px" height="17px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.59 3.03h12.2v1.26H3.59zm0 4.29h12.2v1.26H3.59zm0 4.35h12.2v1.26H3.59zM.99 4.79h.49V2.52H.6v.45h.39v1.82zm.87 3.88H.91l.14-.11.3-.24c.35-.28.49-.5.49-.79A.74.74 0 0 0 1 6.8a.77.77 0 0 0-.81.84h.52A.34.34 0 0 1 1 7.25a.31.31 0 0 1 .31.31.6.6 0 0 1-.22.44l-.87.75v.39h1.64zm-.36 3.56a.52.52 0 0 0 .28-.48.67.67 0 0 0-.78-.62.71.71 0 0 0-.77.75h.5a.3.3 0 0 1 .27-.32.26.26 0 1 1 0 .51H.91v.38H1c.23 0 .37.11.37.29a.29.29 0 0 1-.33.29.35.35 0 0 1-.36-.35H.21a.76.76 0 0 0 .83.8.74.74 0 0 0 .83-.72.53.53 0 0 0-.37-.53z"/>
        </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().toggleCodeBlock().run()}
          class={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <svg class="fill-black dark:fill-white" width="17px" height="17px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
  
            <rect id="Icons" x="-704" y="0" width="1280" height="800" style="fill:none;"/>
            <path id="codeblock" d="M38.147,56.256c3.68,-0.818 6.451,-2.165 8.312,-4.039c1.861,-1.874 2.791,-4.35 2.791,-7.428l0,-4.886c0,-3.978 2.204,-5.967 6.612,-5.967l0,-3.56c-4.408,0 -6.612,-1.981 -6.612,-5.942l0,-5.108c-0.041,-2.995 -0.972,-5.414 -2.791,-7.256c-1.82,-1.841 -4.59,-3.179 -8.312,-4.014l-1.186,2.824c4.346,1.096 6.519,3.953 6.519,8.569l0,4.96c0,3.716 1.736,6.302 5.209,7.759c-3.473,1.474 -5.209,4.084 -5.209,7.833l0,5.058c-0.062,4.502 -2.235,7.293 -6.519,8.373l1.186,2.824Zm-12.44,-0.025c-3.679,-0.818 -6.448,-2.164 -8.308,-4.037c-1.86,-1.873 -2.79,-4.348 -2.79,-7.424l0,-4.884c0,-3.975 -2.203,-5.963 -6.609,-5.963l0,-3.559c4.406,0 6.609,-1.979 6.609,-5.939l0,-5.105c0.041,-2.994 0.971,-5.411 2.79,-7.252c1.818,-1.84 4.587,-3.178 8.308,-4.012l1.184,2.822c-4.343,1.096 -6.515,3.951 -6.515,8.565l0,4.958c0,3.714 -1.735,6.299 -5.206,7.755c3.471,1.472 5.206,4.082 5.206,7.829l0,5.055c0.062,4.5 2.234,7.289 6.515,8.369l-1.184,2.822Z" style="fill-rule:nonzero;"/>
            </svg>
          </button>
        </div>
      <div class="h-full w-full border">
          <button
          on:click={() => editor.chain().focus().toggleBlockquote().run()}
          class={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <svg class="fill-black dark:fill-white bi bi-blockquote-left" width="17px" height="17px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z"/>
          </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
          <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L20 12" class="stroke-black dark:stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button on:click={() => editor.chain().focus().setHardBreak().run()}> 
          <svg class="stroke-black dark:stroke-white" width="17px" height="17px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 15H42C43.1046 15 44 15.8954 44 17V31C44 32.1046 43.1046 33 42 33H32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 15H6C4.89543 15 4 15.8954 4 17V31C4 32.1046 4.89543 33 6 33H17" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 6V42"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 24H16"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M32 24H36"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button on:click={() => {
            const url = window.prompt('URL')
            const imageUrl = url || ""; // Set a default empty string if url is null
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }}>
            <svg width="17px" height="17px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                    <g id="Icon-Set" transform="translate(-360.000000, -99.000000)" class="fill-black dark:fill-white">
                        <path d="M368,109 C366.896,109 366,108.104 366,107 C366,105.896 366.896,105 368,105 C369.104,105 370,105.896 370,107 C370,108.104 369.104,109 368,109 L368,109 Z M368,103 C365.791,103 364,104.791 364,107 C364,109.209 365.791,111 368,111 C370.209,111 372,109.209 372,107 C372,104.791 370.209,103 368,103 L368,103 Z M390,116.128 L384,110 L374.059,120.111 L370,116 L362,123.337 L362,103 C362,101.896 362.896,101 364,101 L388,101 C389.104,101 390,101.896 390,103 L390,116.128 L390,116.128 Z M390,127 C390,128.104 389.104,129 388,129 L382.832,129 L375.464,121.535 L384,112.999 L390,118.999 L390,127 L390,127 Z M364,129 C362.896,129 362,128.104 362,127 L362,126.061 L369.945,118.945 L380.001,129 L364,129 L364,129 Z M388,99 L364,99 C361.791,99 360,100.791 360,103 L360,127 C360,129.209 361.791,131 364,131 L388,131 C390.209,131 392,129.209 392,127 L392,103 C392,100.791 390.209,99 388,99 L388,99 Z" id="image-picture" >
                        </path>
                    </g>
                </g>
            </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button on:click={() => {
            const url = window.prompt('URL')
            const imageUrl = url || ""; // Set a default empty string if url is null
            editor.chain().focus().extendMarkRange('link').setLink({ href: imageUrl }).run();
          }}>
          <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="stroke-black dark:stroke-white" d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="stroke-black dark:stroke-white" d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="h-full w-full border">
        <button
          on:click={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="stroke-black dark:stroke-white" d="M20 7H9.00001C7.13077 7 6.19615 7 5.5 7.40193C5.04395 7.66523 4.66524 8.04394 4.40193 8.49999C4 9.19615 4 10.1308 4 12C4 13.8692 4 14.8038 4.40192 15.5C4.66523 15.9561 5.04394 16.3348 5.5 16.5981C6.19615 17 7.13077 17 9 17H16M20 7L17 4M20 7L17 10"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      </div>
    </div>
  {/if}
  <div class="bg-transparent my-4 shadow-sm sm:leading-6 ">
    <div class="prose dark:text-white text-black" bind:this={element} />
  </div>
</div>
