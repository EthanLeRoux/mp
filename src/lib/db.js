import { openDB } from "idb";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export const dbPromise = openDB("offline-social", 1, {

  upgrade(db) {

    db.createObjectStore("posts", { keyPath: "id" });

    db.createObjectStore("queue", { autoIncrement: true });

  }

});

export async function getPosts() {

  return (await dbPromise).getAll("posts");

}

export async function savePost(post) {

  return (await dbPromise).put("posts", post);

}

export async function deletePostLocal(id) {

  return (await dbPromise).delete("posts", id);

}

export async function fetchPostsFromFirebase() {

  const snapshot = await getDocs(collection(firestore, "posts"));

  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));

}

function fileToBase64(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;

    reader.readAsDataURL(file);

  });

}

export async function savePostToFirebase(post) {

  let images = post.images || [];

  if (images.length && typeof images[0] !== "string") {

    images = await Promise.all(images.map(fileToBase64));

  }

  const postData = { ...post, images };

  await setDoc(doc(firestore, "posts", post.id), postData);

}

export async function deletePostFromFirebase(id) {

  await deleteDoc(doc(firestore, "posts", id));

}