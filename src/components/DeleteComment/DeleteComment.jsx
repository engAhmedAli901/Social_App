import React from 'react'
import Style from "./DeleteComment.module.css"
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export default function DeleteComment({postid4 , commentid4}) {

  let queryclient = useQueryClient()


  function DeleteComment(){
    return axios.delete(`https://route-posts.routemisr.com/posts/${postid4}/comments/${commentid4}`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


  let {mutate , isPending} = useMutation({
    mutationFn:(postid4 , commentid4)=>DeleteComment(postid4 , commentid4),
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["PostComments"]
      })
    }
  })


  function handleDelete(){
    mutate(postid4 , commentid4)
  }




  return <>
<button disabled={isPending} onClick={()=>handleDelete()} className={`${isPending?"cursor-not-allowed opacity-10":"cursor-pointer opacity-100"}  hover:bg-red-500 bg-red-600 rounded-full px-1`}><i className=' text-white text-2xs fa-solid fa-trash'></i></button>
  </>
}
