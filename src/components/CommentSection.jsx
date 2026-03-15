import React,{useState} from "react"
import { v4 as uuid } from "uuid"
import CommentItem from "./CommentItem"

export default function CommentSection({post}){

const [comments,setComments] = useState(post.comments || [])
const [text,setText] = useState("")

function addComment(){

const newComment={
id:uuid(),
content:text,
createdAt:new Date().toISOString()
}

const updated=[...comments,newComment]

setComments(updated)

setText("")

}

return(

<div>

<h4>Comments</h4>

{comments.map(c=>(
<CommentItem key={c.id} comment={c}/>
))}

<input
value={text}
onChange={e=>setText(e.target.value)}
placeholder="Add comment"
/>

<button onClick={addComment}>Post</button>

</div>

)

}