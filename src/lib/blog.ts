import { doc, deleteDoc, setDoc, Firestore } from 'firebase/firestore';

export async function deleteBlog(firestore: Firestore, title: string) {
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
export async function postBlog(firestore: Firestore, title: string, author: string, image: string, text: HTMLDivElement) {    
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
                date: new Date().toLocaleDateString()
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