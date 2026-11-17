import React, { useContext, useEffect, useState } from 'react'
import Style from "./UserPosts.module.css"
import { UserContext } from '../../Context/UserContext'
import { Link, useParams } from 'react-router-dom'
import LikeUsers from '../LikeUsers/LikeUsers'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FriendsContext } from '../../Context/FriendsConrext'
export default function UserPosts() {


  // Likes
  const [selectedPostId, setSelectedPostId] = useState(null)  
const [showLikes, setShowLikes] = useState(false)  





let {id} = useParams()




  // display profile
  




const [userFollow, setUserFollow] = useState(localStorage.getItem("followedUsers") || [])
const isFollow = userFollow.includes(id)

let {  mutate , isPending } = useContext(FriendsContext)

function handleFollow() {
  let updatedUsers;

  if (isFollow) {
    updatedUsers = userFollow.filter(userId => userId !== id)
  } else {
    updatedUsers = [...userFollow, id]
  }

  mutate(Userdata._id)

  setUserFollow(updatedUsers)

  localStorage.setItem(
    "followedUsers",
    JSON.stringify(updatedUsers)
  )
}




function GetUserData(id){
  return axios.get(`https://route-posts.routemisr.com/users/${id}/profile`,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
    }
  })
}



let {data:Userdata , isLoading , error , isError} = useQuery({
  queryKey:["data"],
  queryFn:()=>GetUserData(id),
  select:(data)=>data?.data?.data?.user
})


function ProfilePosts(){
    return axios.get(`https://route-posts.routemisr.com/users/${id}/posts`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


  let {data:MyPosts , isError:MyDetailsisError , isLoading:MyDetailsIsLoading , error:MyDetailserror} = useQuery({
    queryKey:["Userposts"],
    queryFn: ProfilePosts,
    select:(data)=>data?.data?.data?.posts
  })


  console.log(MyPosts);



console.log(Userdata);
console.log(id);
console.log(error);



  return <>
  <div>





















    <div className='md:w-[80%] w-[95%] mx-auto'>
      <div className='w-full mx-auto bg-[#FFFFFF] rounded-4xl pb-10'>
        <div className='flex  flex-wrap mx-auto gap-3 p-5 '>
            <div className='relative lg:w-[10%] w-[20%] cursor-pointer group'>
              <img className='rounded-full   border-3 border-green-700' src={Userdata?.photo}></img>
                 </div>
        <div className='md:mt-3 lg:mr-50'>
          <h1 className='font-bold text-4xl'>{Userdata?.name}</h1>
          <h3 className='font-semibold text-lg text-gray-500'>@{Userdata?.username}</h3>
          <h3 className='font-semibold text-lg text-gray-500'>{Userdata?.email}</h3>
        </div>
          
        
        <div className='ml-auto'>
          <button
  onClick={handleFollow}
  disabled={isPending}
  className={`${isFollow ? "bg-green-600" : "bg-blue-600"} mt-10 text-white rounded-xl py-1 px-3 text-xl font-bold mb-2 cursor-pointer`}
>
  <i className={`fa-solid ${isFollow ? "fa-circle-check" : "fa-user-plus"}`}></i>
  {isFollow ? "Following" : "Follow"}
</button>
</div>

        </div>
        <div className='flex gap-3 h-fit flex-wrap  justify-center  '>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center'>
            <p className='font-semibold text-white'>Followers</p>
            <span className='font-bold text-2xl text-white'>{Userdata?.followersCount}</span>
          </div>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center'>
            <p className='font-semibold text-white'>Following</p>
            <span className='font-bold text-2xl text-white'>{Userdata?.followingCount}</span>
          </div>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center'>
            <p className='font-semibold text-white'>Bookmarks</p>
            <span className='font-bold text-2xl text-white'>{Userdata?.bookmarksCount}</span>
          </div>
        </div>
        <div className='flex flex-wrap w-full justify-around mt-5'>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center w-[40%]'>
            <p className='font-semibold text-white pb-4'>My posts</p>
            <span className='font-bold text-2xl text-white'>{MyPosts?.length}</span>
          </div>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center w-[40%]'>
            <p className='font-semibold text-white pb-4'>Saved posts</p>
            <span className='font-bold text-2xl text-white'>{Userdata?.bookmarksCount}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

<div>
  <div className="mb-4   md:w-[80%] mx-auto border-default mt-5 rounded-2xl ">
       <div className="p-4 rounded-base " id="profile" role="tabpanel" aria-labelledby="profile-tab">
      {MyPosts?.map((post)=>{
    return  <div className='relative'>
      <div onClick={()=>{setShowLikes(false); setSelectedPostId(null)}}>
        <div className={`   mx-auto ${showLikes?`opacity-20 pointer-events-none cursor-pointer`:`pointer-events-auto`}` }>
      <div  className='bg-white mt-10 md:w-full w-[95%]  mx-auto pb-3  rounded-2xl'>
     <Link to={`/postdetails/${post.id}`}>
      <div className='p-3'>
        <div className='flex justify-between'>
          <div className='flex flex-wrap gap-1.5'>
        {<img className='w-[50px] rounded-full' src={post.user.photo}></img>}
        <div>
          <p className='font-bold text-sm'>{post.user.name}</p>
          <p className='text-xs'>@{post.user.username}</p>
          <p className='text-xs font-semibold'>{post.createdAt.split("T")[0]}</p>
        </div>
      </div>
        <div className='flex me-3 gap-1'>
        <button className='bg-black cursor-pointer text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl'><i className="fa-regular mt-2 fa-bookmark"></i></button>
       </div>
        </div>
     <h1 onClick={(e)=>{e.preventDefault(); e.stopPropagation();}} className='mt-2.5 font-semibold'>{post.body}</h1>
      </div>
        
<div className='relative'>
  <img className='mt-3 w-full ' src={post.image}></img>
</div>

        <div className='w-[95%] mt-3 mx-auto flex justify-between'>
<span ><i className="fa-solid fa-thumbs-up  text-blue-700 rounded-full   "></i><span onClick={(e)=>{
            e.stopPropagation();
            e.preventDefault();
            setShowLikes(true)
            setSelectedPostId(
      selectedPostId === post.id ? null : post.id
    )
          }} className='hover:underline hover:underline-offset-2 hover:text-blue-500'>{post.likesCount} Likes</span></span>
          <div className='flex gap-3'>
          <span className=''><i className="fa-solid fa-retweet  text-black rounded-full   "></i> {post.sharesCount} shares</span>
          <span className=''><i className="fa-regular fa-message  text-black rounded-full   "></i> {post.commentsCount} comments</span>
          </div>
        </div>
      {post.commentsCount>0?
      <div className='pb-2'>
        <div className='bg-[#F0F2F5]  m-5  rounded-2xl p-2 '>
          <p className='text-xs font-bold text-black mb-3'>Top Comment</p>
         <div className='flex'>
           <div>
             {<img className='w-[40px] mr-2 rounded-full border-2 border-green-600' src={post.topComment?.commentCreator?.photo}></img>}
          </div>
          <div className='bg-white p-2 w-full rounded-t-2xl rounded-br-2xl'>
            <p className='font-bold text-xs'>{post.topComment?.commentCreator?.name}</p>
<p className='text-xs'>
  {new Date(post.topComment?.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })}
</p>            <p className='font-semibold'>{post.topComment?.content}</p>
          </div>
         </div>
               <Link to={`/postdetails/${post.id}`} className='text-blue-500 text-xs font-bold underline underline-offset-1'>View All Comments</Link>

        </div>
      </div>
      :""}

       </Link> 
      </div>
      
    </div>
      </div>
                <div className='w-1/2 mx-auto rounded-2xl bg-black opacity-100 fixed top-40 left-5 right-2'> {selectedPostId === post.id && <LikeUsers id={post.id} />}</div>
      
    </div>
  })}
    </div>
  </div>
</div>
  
  
  </>
  
}


