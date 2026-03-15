import React, { useEffect, useState } from "react";

import {
  getPosts,
  savePost,
  fetchPostsFromFirebase,
  savePostToFirebase
} from "./lib/db";

import PostFeed from "./components/PostFeed";
import CreatePostForm from "./components/CreatePostForm";
import SearchBar from "./components/SearchBar";
import SyncStatusIndicator from "./components/SyncStatusIndicator";

export default function App() {

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadPosts();

    // attempt sync again when connection returns
    window.addEventListener("online", loadPosts);

    return () => {
      window.removeEventListener("online", loadPosts);
    };

  }, []);

  async function loadPosts() {

    let localPosts = [];
    let remotePosts = [];

    // get local IndexedDB posts
    try {
      localPosts = await getPosts();
    } catch {
      localPosts = [];
    }

    // get Firebase posts
    try {
      remotePosts = await fetchPostsFromFirebase();
    } catch {
      remotePosts = [];
    }

    const map = new Map();

    // add Firebase posts first
    for (const post of remotePosts) {

      map.set(post.id, post);

      // if firebase post not in local db → save locally
      const existsLocally = localPosts.find(p => p.id === post.id);

      if (!existsLocally) {
        await savePost(post);
      }

    }

    // add local posts
    for (const post of localPosts) {

      if (!map.has(post.id)) {

        map.set(post.id, post);

        // upload local-only post to Firebase
        try {
          await savePostToFirebase(post);
        } catch {
          // ignore if offline
        }

      }

    }

    const merged = Array.from(map.values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setPosts(merged);

  }

  async function handleNewPost(post) {

    // save locally first
    await savePost(post);

    // update UI
    setPosts(prev => [post, ...prev]);

    // try syncing to Firebase
    try {
      await savePostToFirebase(post);
    } catch {
      console.log("Offline — will sync later");
    }

  }

  const filtered = posts.filter(p =>
    p.content.toLowerCase().includes(query.toLowerCase()) ||
    p.hashtags?.some(h => h.includes(query))
  );

  return (

    <div className="container">

      <h1>Offline Social</h1>

      <SyncStatusIndicator />

      <SearchBar onSearch={setQuery} />

      <CreatePostForm onCreate={handleNewPost} />

      <PostFeed posts={filtered} />

    </div>

  );

}