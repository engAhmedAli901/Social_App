// import React, {   useState } from 'react'
// import Style from "./Home.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AddPost from '../AddPost/AddPost';
import LikePosts from '../LikePosts/LikePosts';
import LikeUsers from '../LikeUsers/LikeUsers';
import { useContext, useState } from 'react';
import BookMark from '../BookMark/BookMark';
import { FriendsContext } from '../../Context/FriendsConrext';
import CreateComment from '../CreateComment/CreateComment';
import SharePost from '../SharePost/SharePost';
export default function Home() {

const [selectedPostId, setSelectedPostId] = useState(null)  
const [showLikes, setShowLikes] = useState(false)  
const [value, setValue] = useState("")
const [friendId, setFriendId] = useState("")
const [isShare, setIsShare] = useState(false)
const [isShareId, setIsShareId] = useState("")




function getAllPosts(){
  return  axios.get(`https://route-posts.routemisr.com/posts`,{
                headers:{
                    token:localStorage.getItem("userToken")
                }
            })
}

let {data , isError , isLoading , error} = useQuery({
  queryKey:["AllPosts"],
  queryFn: getAllPosts,
  gcTime:3000,
  select:(data)=>data?.data?.data.posts
})

console.log(data);


let {SuggestedFriends , mutate , isPending} = useContext(FriendsContext)



const FilteredFriends = SuggestedFriends?.filter((friend) => {
  return friend.name.toLowerCase().includes(value.toLowerCase())
})

if(isError){
return <h1>{error.message}</h1>
}


if(isLoading){
   return <span className="loader"></span>
}

  return <>
  
  <div className='relative'>
<AddPost />

<div className=' w-[95%] md:w-fit lg:mt-0 mx-auto mt-5 lg:fixed lg:top-26 lg:right-5  h-fit bg-white p-4 rounded-3xl'>
    <h1 className='text-start font-bold'><i className="fa-solid text-blue-700 text-lg fa-children"> </i> Suggested Friends</h1>
    {/* input */}
    <form class="max-w-md mx-auto my-3">   
    <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input onChange={(e)=>{setValue(e.target.value)}} type="search" id="search" class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search Friends..." required />
    </div>
</form>
{(value==""?SuggestedFriends:FilteredFriends)?.slice(0,4).map((friend)=>{
      return <div>
        <div className='cursor-pointer hover:bg-gray-100 flex  mt-2 gap-3 p-5 border border-gray-200 rounded-3xl '>
          <img className='w-[40px] h-[40px] rounded-full' src={friend.photo} />
          <div className=' w-[150px] h-fit'>
            <Link to={`/userprofile/${friend._id}`}><p className='hover:underline hover:underline-offset-1 text-sm font-bold w-full'>{friend.name}</p></Link>
          <p className='text-xs text-gray-500'>@{friend.username}</p>
          </div>
          <div className='my-auto'>
          <button onClick={()=>{mutate(friend._id); setFriendId(friend._id)}} className='bg-blue-600 text-white rounded-4xl py-1 px-3 text-xs mb-2 cursor-pointer'>{isPending && friend._id == friendId?"Updating...":"Follow"}</button>
                   <p className='text-2xs bg-gray-300 w-fit px-2 py-1 rounded-3xl'>{friend.followersCount} Followers</p>

          </div>
        </div>
      </div>
    })}
    <Link to={"/requests"}><button className='cursor-pointer hover:bg-blue-500 bg-blue-600 w-full mt-3 text-white rounded py-1 text-center'>View More</button>
</Link>
  </div>


<div className=' mx-auto md:w-1/2 '>
    {data.map((post)=>
  
  <div className='relative opacity-100'>
    <div onClick={()=>{setShowLikes(false); setSelectedPostId(null)}}>
      <div  className={showLikes?`opacity-20 pointer-events-none cursor-pointer`:`pointer-events-auto`}>
    
      <div  className='bg-white mt-10 w-[95%]   mx-auto pb-3  rounded-2xl'>
     <div>
      <div className='p-3'>
        <div className='flex justify-between'>
          <Link className='hover:underline hover:underline-offset-1 cursor-pointer'  to={`/userprofile/${post.user._id}`}>
          <div className='flex flex-wrap gap-1.5'>
        {<img className='w-[50px] rounded-full' src={post.user.photo}></img>}
        <div>
          <p className='font-bold text-sm'>{post.user.name}</p>
          <p className='text-xs'>@{post.user.username}</p>
          <p className='text-xs font-semibold'>{post.createdAt.split("T")[0]}</p>
        </div>
      </div>
          </Link>
       <div className='flex me-3 gap-1'>
        <button className='bg-black text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl cursor-pointer'><BookMark id={post.id} /></button>
       </div>
        </div>
      <h1 className='mt-2.5 font-semibold'>{post.body}</h1>
      {post.bookmarked?<span className='bg-yellow-400 rounded-4xl p-1 text-2xs mt-2 font-bold'><i className='fa-regular text-xs fa-bookmark'></i> Saved</span>:""}
      </div>
        {post.isShare?
        <div className="rounded-xl w-[95%] mx-auto border border-slate-200 bg-slate-50 p-3">
        <div>
          <div className='flex justify-between'>
            <div className="flex items-center gap-2">
              <img
                alt="MrMo"
                className="h-8 w-8 rounded-full object-cover"
                src={post?.sharedPost.user.photo}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {post?.sharedPost.user.name}
                </p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  @{post?.sharedPost.user.username}
                </p>
              </div>
            </div>
              <Link to={`/postdetails/${post.id}`} className='text-sm text-blue-600 mt-1 hover:underline hover:underline-offset-1 cursor-pointer'>Show Original Post</Link>
        </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
              {post?.sharedPost.body}
            </p>
            {post?.sharedPost.image?<img
              alt="post preview"
              className="mt-2  w-full rounded-lg object-cover"
              src={post?.sharedPost.image}
            />:""}
        </div>
          </div>
        :
        ""
        }
        {<img className='mt-3 w-full ' src={post.image}></img>}
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
          <Link to={`/postdetails/${post.id}`} className='text-sm text-blue-600 mt-1 hover:underline hover:underline-offset-1 cursor-pointer'>View Detailes</Link>
          </div>
        </div>
        <hr className='w-[95%] mx-auto mt-3 text-gray-200'/>
        <div className=' w-[80%] mx-auto mt-3 flex justify-between'>
          <LikePosts id={post.id}/>
          <Link to={`/postdetails/${post.id}`} className='cursor-pointer text-lg'><i className="fa-regular fa-message  rounded-full  text-xl "></i>Comment</Link>
          <div onClick={()=>{setIsShare(!isShare); setIsShareId(post.id)}}><span className='text-lg'><i className="fa-solid fa-retweet  rounded-full  text-xl "></i>Share</span></div>
          {isShare && isShareId== post.id?<SharePost id={post.id} setIsShare={setIsShare} isShare={isShare}/>:""}
        </div>
        <CreateComment id={post.id} />
      {post.commentsCount>0?
      <div className='pb-2'>
        
        <div className='bg-[#F0F2F5]  m-5  rounded-2xl p-2 '>
          <p className='text-xs font-bold mt-5 text-black mb-3'>Top Comment</p>
         <div className='flex'>
           <div>
             {<img className='w-[40px] mr-2 rounded-full border-2 border-green-600' src={post.topComment?.commentCreator?.photo}></img>}
          </div>
          <div className='bg-white p-2 w-full rounded-t-2xl rounded-br-2xl'>
            <Link to={`/userprofile/${post.topComment?.commentCreator?._id}`}><p className='hover:underline hover:underline-offset-2 font-bold text-xs'>{post.topComment?.commentCreator?.name}</p></Link>
<p className='text-xs'>
  {new Date(post.topComment?.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })}
</p>            <p className='font-semibold'>{post.topComment?.content}</p>
<div className="w-fit mx-auto relative ">
        <img className="rounded-2xl mt-2 " src={post.topComment?.image}  />
        </div>
          </div>
         </div>
               <Link to={`/postdetails/${post.id}`} className='text-blue-500 text-xs font-bold underline underline-offset-1'>View All Comments</Link>

        </div>
      </div>
      :""}

       </div> 
      </div>
    </div>
    </div>
          <div className='w-1/2 mx-auto rounded-2xl bg-black opacity-100 absolute top-40 left-5 right-2'> {selectedPostId === post.id && <LikeUsers id={post.id} />}</div>

  </div>
    
  
  )}
  </div>
  </div>

  
  </>
}


