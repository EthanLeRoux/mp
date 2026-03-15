import React,{useState,useEffect} from "react"

export default function SyncStatusIndicator(){

const [online,setOnline] = useState(navigator.onLine)

useEffect(()=>{

window.addEventListener("online",()=>setOnline(true))
window.addEventListener("offline",()=>setOnline(false))

},[])

return(

<div>

Status: {online ? "Online" : "Offline"}

</div>

)

}