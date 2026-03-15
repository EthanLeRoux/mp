import React from "react"

export default function SearchBar({onSearch}){

return(

<input
placeholder="Search posts or #hashtags"
onChange={e=>onSearch(e.target.value)}
/>

)

}