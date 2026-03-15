import React from "react"
import CommentSection from "./CommentSection"

export default function PostCard({post}){

return(

<div className="card">

<p>{post.content}</p>

{post.imageData && (
<img src={post.imageData} style={{maxWidth:"100%"}}/>
)}

<div>

{post.hashtags?.map(tag => (
<span key={tag}>{tag} </span>
))}

</div>

<CommentSection post={post}/>

</div>

)

}