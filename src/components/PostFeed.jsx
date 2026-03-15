import React from "react"
import PostCard from "./PostCard"

export default function PostFeed({posts}){

return(
<div>

{posts.map(p => (
<PostCard key={p.id} post={p}/>
))}

</div>
)

}