import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
import { doc, deleteDoc, setDoc, Firestore, Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';

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
                        const docRef = doc(firestore, "research", slugify(title));
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
export async function postBlog(firestore: Firestore, title: string, author: string, image: string, abstract: string, link: string, date: string, doi: string) {    
    try {
        if (firestore) {
            const docRef = doc(firestore, 'research', slugify(title));
            await setDoc(docRef, {
                title: title,
                author: author,
                image: image,
                abstract: abstract,
                link: link,
                date: Timestamp.fromDate(DateTime.fromISO(date).toJSDate()),
                doi: doi
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