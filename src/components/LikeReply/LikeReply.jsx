import React, { useState } from 'react'
import Style from "./LikeReply.module.css"
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export default function LikeReply({postid3 , commentid3 , count}) {
const [pressLike, setPressLike] = useState(false) 
const [likeid, setLikeid] = useState("") 


  let queryclient = useQueryClient()

  function LikeRePly(){
    return axios.put(`https://route-posts.routemisr.com/posts/${postid3}/comments/${commentid3}/like`,{},{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }

  let {mutate} = useMutation({
    mutationFn:LikeRePly,
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["PostComments"]
      })
      queryclient.invalidateQueries({
        queryKey:["reply"]
      })
    }
  })


function display(){
  mutate(postid3 , commentid3)
  setPressLike(!pressLike)
  setLikeid(commentid3)
}



  return <>
          <p onClick={()=>display()}  className={` ${pressLike && likeid==commentid3? "text-blue-600" : "text-gray-500" } text-xs  font-bold cursor-pointer hover:text-blue-700 hover:underline hover:underline-offset-2`}>Like ({count})</p>
  </>
}
