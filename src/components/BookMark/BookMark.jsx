import React from 'react'
import Style from "./BookMark.module.css"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function BookMark({id}) {

  let queryclient = useQueryClient()


  function BookMarkPost(id){
    return axios.put(`https://route-posts.routemisr.com/posts/${id}/bookmark`,{},{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }




  let { mutate , isPending } = useMutation({
    mutationFn:()=>BookMarkPost(id),
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["Profile"]
      })
      queryclient.invalidateQueries({
        queryKey:["AllPosts"]
      })
    },
    onError:()=>{
      toast.error("POST Not Saved!")
    }
  })


  return <>
<i onClick={()=>mutate(id)} className={`fa-regular mt-2 fa-bookmark`}></i>
  </>
}
