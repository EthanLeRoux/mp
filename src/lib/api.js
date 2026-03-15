// API wrapper: use Firebase for backend, idb for local/offline
import {
	getPosts,
	savePost,
	deletePost,
	fetchPostsFromFirebase,
	savePostToFirebase,
	deletePostFromFirebase
} from "./db";

// Local/offline (idb)
export { getPosts, savePost, deletePost };

// Cloud backend (Firebase)
export const fetchPosts = fetchPostsFromFirebase;
export const insertPost = savePostToFirebase;
export const updatePost = savePostToFirebase;
export const deletePostCloud = deletePostFromFirebase;