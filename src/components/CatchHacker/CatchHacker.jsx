import React from 'react'
import Style from "./CatchHacker.module.css"
import { Navigate } from 'react-router-dom'
export default function CatchHacker(props) {


  if(localStorage.getItem("userToken")){
    return props.children
  }
  else{
    return <Navigate to={"/login"}/>
  }

}
