
import { openDB } from "idb";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";


// Firebase config from Vite environment variables
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const dbPromise = openDB("offline-social", 1, {
	upgrade(db) {
		db.createObjectStore("posts", { keyPath: "id" });
		db.createObjectStore("queue", { autoIncrement: true });
	}
});

// IndexedDB (idb) local functions
export async function getPosts() {
	return (await dbPromise).getAll("posts");
}

export async function savePost(post) {
	return (await dbPromise).put("posts", post);
}

export async function deletePost(id) {
	return (await dbPromise).delete("posts", id);
}

// Firebase sync functions
export async function fetchPostsFromFirebase() {
	const querySnapshot = await getDocs(collection(db, "posts"));
	return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function savePostToFirebase(post) {
	// Assumes post.id exists
	await setDoc(doc(db, "posts", post.id), post);
}

export async function deletePostFromFirebase(id) {
	await deleteDoc(doc(db, "posts", id));
}