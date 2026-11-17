import React from 'react'
import Style from "./LikeUsers.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export default function LikeUsers({id}) {


  function GetUsersLikes(id){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/likes?page=1&limit=20`,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
  }



   let {data:UsersLike , isLoading , error , isError} = useQuery({
    queryFn:()=>GetUsersLikes(id),
    queryKey:["UserLikes" , id],
    select:(data)=>data?.data?.data?.likes
   })

console.log(UsersLike);


  return <>
  <div className='bg-white rounded-2xl  mx-auto p-3'>
  <h1 className='text-lg font-bold'><i class="fa-solid text-blue-600 fa-users mr-1"></i> People who reacted</h1>
  <hr className='text-gray-300 mt-2 font-light' />
  {
    UsersLike?.map((member)=>{
      return<div className='flex mt-5 cursor-pointer'>
      <img className='w-[50px] mr-2 rounded-full' src={member?.photo} />
      <div className='mt-1'>
        <p className='font-bold text-sm'>{member?.name}</p>
      <p className='text-sm'>@{member?.username}</p>
      </div>
    </div>
    })
  }
   </div>
  </>
}
