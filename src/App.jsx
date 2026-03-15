import React, { useEffect, useState } from "react"
import { getPosts, savePost } from "./lib/db"
import PostFeed from "./components/PostFeed"
import CreatePostForm from "./components/CreatePostForm"
import SearchBar from "./components/SearchBar"
import SyncStatusIndicator from "./components/SyncStatusIndicator"

export default function App(){

const [posts,setPosts] = useState([])
const [query,setQuery] = useState("")

useEffect(()=>{
loadPosts()
},[])

async function loadPosts(){
const p = await getPosts()
setPosts(p)
}

function handleNewPost(post){
setPosts([post,...posts])
savePost(post)
}

const filtered = posts.filter(p =>
p.content.toLowerCase().includes(query.toLowerCase()) ||
p.hashtags?.some(h => h.includes(query))
)

return(
<div className="container">

<h1>Offline Social</h1>

<SyncStatusIndicator/>

<SearchBar onSearch={setQuery}/>

<CreatePostForm onCreate={handleNewPost}/>

<PostFeed posts={filtered}/>

</div>
)

}