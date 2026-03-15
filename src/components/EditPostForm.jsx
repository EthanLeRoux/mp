import React,{useState} from "react"

export default function EditPostForm({post,onSave}){

const [text,setText] = useState(post.content)

function save(){

onSave({
...post,
content:text,
updatedAt:new Date().toISOString()
})

}

return(

<div>

<textarea
value={text}
onChange={e=>setText(e.target.value)}
/>

<button onClick={save}>Save</button>

</div>

)

}