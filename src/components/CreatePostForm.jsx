import React,{useState} from "react"
import { v4 as uuid } from "uuid"

export default function CreatePostForm({onCreate}){

const [text,setText] = useState("")

function extractTags(text){
return text.match(/#\w+/g) || []
}

function submit(e){

e.preventDefault()

const post={
id:uuid(),
content:text,
hashtags:extractTags(text),
comments:[],
createdAt:new Date().toISOString(),
updatedAt:new Date().toISOString(),
syncStatus:"pending"
}

onCreate(post)
setText("")

}

return(

<form onSubmit={submit} className="card">

<textarea
value={text}
onChange={e=>setText(e.target.value)}
placeholder="Write something..."
/>

<button>Create</button>

</form>

)

}