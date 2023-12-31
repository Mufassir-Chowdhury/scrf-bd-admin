import { doc, deleteDoc, setDoc, Firestore } from 'firebase/firestore';
import { DateTime } from "luxon";
import { Timestamp } from "@firebase/firestore";
import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

export async function deleteBlog(firestore: Firestore, title: string) {
			
    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: 'confirm',
        // Data
        title: 'Please Confirm',
        body: 'Are you sure you want to delete?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: async (r: boolean) => {
            if (r) {
                try {
                    if (firestore) {
                        const docRef = doc(firestore, "blogs", slugify(title));
                        console.log(docRef);
                        await deleteDoc(docRef);
                    } else {
                        console.error("Firestore is undefined.");
                    }
                } catch (e) {
                    console.error("Error deleting document: ", e);
                }
            }
        },
    };
    modalStore.trigger(modal);
    
    
}
export async function postBlog(firestore: Firestore, title: string, author: string, date: string, image: string, text: HTMLDivElement) {    
    try {
        if (firestore) {
            console.log(firestore);
            console.log('posted');
            const docRef = doc(firestore, 'blogs', slugify(title));
            console.log(docRef);
            await setDoc(docRef, {
                title: title,
                author: author,
                image: image,
                content: text.outerHTML.replace("contenteditable=\"true\"", "contenteditable=\"false\""),
                slug: slugify(title),
                date: Timestamp.fromDate(DateTime.fromISO(date).toJSDate())
            });
            
        } else {
            console.error('Firestore is undefined.');
        }
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}
export function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z]+/g, '-');
}