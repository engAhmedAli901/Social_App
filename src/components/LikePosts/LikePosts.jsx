import React, { useState } from 'react'
import Style from "./LikePosts.module.css"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
export default function LikePosts({id}) {

  const [isLike, setIsLike] = useState(localStorage.getItem(`LikeState-${id}`) === "true")


  let  queryclient  = useQueryClient()

  function LikePost(id){
    return axios.put(`https://route-posts.routemisr.com/posts/${id}/like`,
      {},{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
  }


  let {mutate , isPending} = useMutation({
    mutationFn:LikePost,
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["AllPosts"]
      })
    }
  })

function HandleLike(){
    let newState = !isLike

    mutate(id, {
      onSuccess:()=>{
        setIsLike(newState)
        localStorage.setItem(`LikeState-${id}`, newState)
      }
    })
  }






  return <>
  <span onClick={(e)=>{
            e.stopPropagation();
            e.preventDefault();
            HandleLike()
            }} className={`cursor-pointer text-lg ${isLike?" text-blue-500":""}`}><i className={` fa-thumbs-up   rounded-full  text-xl ${isLike?"fa-solid text-blue-500":"fa-regular"}`}></i>Like</span>
  </>
}
