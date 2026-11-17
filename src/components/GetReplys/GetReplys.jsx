import React from 'react'
import Style from "./GetReplys.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import LikeReply from '../LikeReply/LikeReply'
export default function GetReplys({PostId , CommentId}) {



  async function getReply(){
    return await axios.get(`https://route-posts.routemisr.com/posts/${PostId}/comments/${CommentId}/replies?page=1&limit=10`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }

let {data} = useQuery({
  queryKey:["reply"],
  queryFn:getReply,
  select:(data)=>data?.data?.data?.replies
})

console.log(data);




  return <>
  {data?.map((comment)=>{
    return  <div className='  '>
                  
        <div className=' ml-10 border-black border-l-3 bg-[#F0F2F5] flex mt-5 mx-5 w-[50%] rounded-t-2xl rounded-br-2xl gap-2 p-2 '>
          <div className=''>
             {<img className='w-[40px] h-[40px] rounded-full border-2 border-green-600' src={comment?.commentCreator?.photo}></img>}
          </div>
          <div className=' w-[90%]'>
           <Link to={`/userprofile/${comment?.commentCreator?._id}`}><p className='hover:underline hover:underline-offset-2 font-bold text-xs'>{comment?.commentCreator?.name}</p></Link>
          <p className='text-xs font-semibold'>{comment?.commentCreator?.username}</p>
<p className='text-xs'>
  {new Date(comment?.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })}
</p>            <p className='font-semibold'>{comment?.content}</p>
<div className=" mx-auto relative ">
        <img className="rounded-2xl mt-2 " src={comment?.image}  />
        </div>
          </div>
        </div>
        <div className=' w-[85%] mx-auto flex gap-4'>
                    {<LikeReply commentid3={comment?._id} postid3={PostId} count={comment.likes.length} />}
          
          </div>
      </div>
  })}
  </>
}
