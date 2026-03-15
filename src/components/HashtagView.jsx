import React from "react"

export default function HashtagView({tag,posts}){

const filtered = posts.filter(p =>
p.hashtags?.includes(tag)
)

return(

<div>

<h2>{tag}</h2>

{filtered.map(p => (
<div key={p.id}>{p.content}</div>
))}

</div>

)

}