import React, { useContext, useState } from 'react'
import Style from "./Profile.module.css"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import AddPost from '../AddPost/AddPost'
import { DeleteContext } from '../../Context/DeleteContext'
import { EditPostContext } from '../../Context/EditPostContext'
import LikeUsers from '../LikeUsers/LikeUsers'
import BookMark from '../BookMark/BookMark'
export default function Profile() {

  let queryclient = useQueryClient()

  let { mutate , isPending:editpending , setBody , body , setImage , image , setImgsrc , imgsrc} = useContext(EditPostContext)

  // Likes
  const [selectedPostId, setSelectedPostId] = useState(null)  
const [showLikes, setShowLikes] = useState(false)  
const [postsType, setPostsType] = useState("myposts")  

// likes



// Edit Post
 function handleChange(e){
    let file = e.target.files[0]
    console.log(file);
   if(file){
     setImage(file)
    setImgsrc(URL.createObjectURL(file))
   }
  }


  function handleForm(id){
    let formdata = new FormData()
    if(image)formdata.append("image",image)
    body?formdata.append("body",body):formdata.append("body"," ")
    mutate({id ,formdata})
  setTimeout(() => {
    setContent("")
  }, 2000);
  }

  // editPOst


  // display profile
 let {data , MyDetails} = useContext(UserContext)
  


//  display delete
let {DeleteOperation , isPending} = useContext(DeleteContext)


const [content, setContent] = useState("")


function getBookMarked(){
  return axios.get(`https://route-posts.routemisr.com/users/bookmarks`,{
    headers:{
      token: localStorage.getItem("userToken")
    }
  })
}



let {data:BookMarked} = useQuery({
  queryFn:getBookMarked,
  queryKey:["BookMarkedPosts"],
  select:(data)=>data?.data?.data?.bookmarks
})

console.log(BookMarked);


// change profile photo 

function UploadPhoto(formdata){
  return axios.put(`https://route-posts.routemisr.com/users/upload-photo`,formdata,{
    headers:{
      token: localStorage.getItem("userToken")
    }
  })
}


let {mutate:PhotoMutate} = useMutation({
  mutationFn:UploadPhoto,
  onSuccess:()=>{
    queryclient.invalidateQueries({
      queryKey:["Profile"]
    })
  }
})

function handlePhoto(image){
  console.log(image);
  
  let formdata = new FormData()
  if(image)formdata.append("photo",image)
  console.log(formdata);
if(formdata.has(image))console.log("hello");

  
  PhotoMutate(formdata)
}
  return <>
  <div>
    <div className='md:w-[80%] w-[95%] mx-auto'>
      <div className='w-full mx-auto bg-[#FFFFFF] rounded-4xl pb-10'>
        <div className='flex flex-wrap mx-auto gap-3 p-5 '>
            <div className='relative lg:w-[10%] w-[20%]  cursor-pointer group'>
              <img className='rounded-full h-full   border-3 border-green-700' src={data?.photo}></img>
              <div className='cursor-pointer absolute bottom-0 bg-blue-600 rounded-full right-1 p-2 hidden  group-hover:inline'>
                <label htmlFor="aaa"><i className='cursor-pointer fa-regular fa-camera  text-white'></i></label>
                <input onChange={(e)=>handlePhoto(e.target.files[0])} id='aaa' accept="image/*" className="hidden" type="file" />
               </div>
                 </div>
        <div className='md:mt-3 lg:mr-50'>
          <h1 className='font-bold text-4xl'>{data?.name}</h1>
          <h3 className='font-semibold text-lg text-gray-500'>@{data?.username}</h3>
          <h3 className='font-semibold text-lg text-gray-500'>{data?.email}</h3>
        </div>
          
        <div className='flex gap-3 h-fit flex-wrap '>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center'>
            <p className='font-semibold text-white'>Followers</p>
            <span className='font-bold text-2xl text-white'>{data?.followersCount}</span>
          </div>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center'>
            <p className='font-semibold text-white'>Following</p>
            <span className='font-bold text-2xl text-white'>{data?.followingCount}</span>
          </div>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center'>
            <p className='font-semibold text-white'>Bookmarks</p>
            <span className='font-bold text-2xl text-white'>{data?.bookmarksCount}</span>
          </div>
        </div>
        </div>
        <div className='flex flex-wrap w-full justify-around mt-5'>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center w-[40%]'>
            <p className='font-semibold text-white pb-4'>My posts</p>
            <span className='font-bold text-2xl text-white'>{MyDetails?.length}</span>
          </div>
          <div className=' bg-blue-800 rounded-3xl p-5 text-center w-[40%]'>
            <p className='font-semibold text-white pb-4'>Saved posts</p>
            <span className='font-bold text-2xl text-white'>{data?.bookmarksCount}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

<div>

<div className="mb-4  mx-auto border-default mt-5 rounded-2xl ">
    <ul className="w-1/2  gap-5 justify-center mx-auto flex flex-wrap -mb-px text-sm font-medium text-center">
      <li className="me-2">
        <button onClick={()=>{setPostsType("myposts")}} className={` ${postsType=="myposts"?"bg-blue-700 text-white": "bg-transparent text-black"} inline-block p-3  cursor-pointer rounded-2xl`}>MyPosts</button>
      </li>
      <li className="me-2">
        <button onClick={()=>{setPostsType("savedposts")}} className={`${postsType=="savedposts"?"bg-blue-700 text-white": "bg-transparent text-black"} inline-block p-3 cursor-pointer rounded-2xl`}>Saved Posts</button>
      </li>
    </ul>
  </div>








 
  <div>
    <div className=" p-4 rounded-base ">

      {postsType=="myposts"?
       MyDetails?.map((post)=>{
    return  <div className='relative'>
      <div onClick={()=>{setShowLikes(false); setSelectedPostId(null)}}>
        <div className={`  md:w-[80%] mx-auto ${showLikes?`opacity-20 pointer-events-none cursor-pointer`:`pointer-events-auto`}` }>
      <div  className='bg-white mt-10 md:w-full w-[95%]  mx-auto pb-3  rounded-2xl'>
     <div>
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
        <button onClick={(e)=>{  e.preventDefault(); e.stopPropagation(); setContent(post.id); setBody(post.body); setImgsrc(post.image)}}  className='cursor-pointer bg-green-700 text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl'><i className="fa-solid mt-2 fa-pen"></i></button>
        <button onClick={(e)=>{  e.preventDefault(); e.stopPropagation(); DeleteOperation(post.id)}} className='cursor-pointer bg-red-700 text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl'><i className={`fa-regular mt-2 ${isPending?"fa-spinner":"fa-trash-can"}`}></i></button>
       </div>
        </div>
        {content==post.id?
       <>
        <textarea
          value={body}
          onClick={(e)=>{e.preventDefault(); e.stopPropagation();}}
          onChange={(e)=>{
            setBody(e.target.value)
          }}
            rows={4}
            placeholder="What's on your mind, Upton?"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
            
          >
            {post.body}
            </textarea>
            <label onClick={(e)=>{ e.stopPropagation()}} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image text-emerald-600"
                aria-hidden="true"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                <circle cx={9} cy={9} r={2} />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="hidden sm:inline">Photo/video</span>
              <input onChange={(e)=>handleChange(e)} accept="image/*" className="hidden"  type="file" />
            </label>
            <div className='mt-3 text-end'>
              <button disabled={editpending} onClick={(e)=>{setContent(""); e.preventDefault(); e.stopPropagation();}} className='bg-red-800 cursor-pointer mr-2 px-3 py-1 text-white rounded-2xl'>Cancel</button>
            <button disabled={editpending} onClick={(e)=>{handleForm(post.id);e.preventDefault(); e.stopPropagation();}  } className={`bg-blue-700 cursor-pointer px-3 py-1 text-white rounded-2xl ${editpending?"cursor-not-allowed" : "cursor-pointer"}`}>{editpending?<i className="fa-solid fa-spinner"></i>:"Save"}</button>
            </div>
       </>
            :
        
        <h1 onClick={(e)=>{e.preventDefault(); e.stopPropagation();}} className='mt-2.5 font-semibold'>{post.body}</h1>}
        {post.isShare?
        <div className="rounded-xl mt-5 mx-auto border border-slate-200 bg-slate-50 p-3">
            <Link to={`/postdetails/${post?.sharedPost.id}`} className="flex items-center gap-2">
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
            </Link>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
              {post?.sharedPost.body}
            </p>
            {post?.sharedPost.image?<img
              alt="post preview"
              className="mt-2  w-full rounded-lg object-cover"
              src={post?.sharedPost.image}
            />:""}
          </div>
        :
        ""
        }
      </div>
        
        {imgsrc && (content==post.id)?<div className="relative">
  <img className="w-full" src={imgsrc}></img>
</div>:
<div className='relative'>
  <img className='mt-3 w-full ' src={post.image}></img>
</div>
}
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

       </div> 
      </div>
      
    </div>
      </div>
                <div className='w-1/2 mx-auto rounded-2xl bg-black opacity-100 fixed top-40 left-5 right-2'> {selectedPostId === post.id && <LikeUsers id={post.id} />}</div>
      
    </div>
  })
      :
      BookMarked?.map((post)=>{
    return  <div className='relative'>
      <div onClick={()=>{setShowLikes(false); setSelectedPostId(null)}}>
        <div className={`  md:w-[80%] mx-auto ${showLikes?`opacity-20 pointer-events-none cursor-pointer`:`pointer-events-auto`}` }>
      <div  className='bg-white mt-10 md:w-full w-[95%]  mx-auto pb-3  rounded-2xl'>
     <div>
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
        <button onClick={(e)=>{
          e.stopPropagation();
          e.preventDefault();
        }} className='bg-black text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl cursor-pointer'><BookMark id={post.id} /></button>       </div>
        </div>
        {content==post.id?
       <>
        <textarea
          value={body}
          onClick={(e)=>{e.preventDefault(); e.stopPropagation();}}
          onChange={(e)=>{
            setBody(e.target.value)
          }}
            rows={4}
            placeholder="What's on your mind, Upton?"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
            
          >
            {post.body}
            </textarea>
            <label onClick={(e)=>{ e.stopPropagation()}} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image text-emerald-600"
                aria-hidden="true"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                <circle cx={9} cy={9} r={2} />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="hidden sm:inline">Photo/video</span>
              <input onChange={(e)=>handleChange(e)} accept="image/*" className="hidden"  type="file" />
            </label>
            <div className='mt-3 text-end'>
              <button disabled={editpending} onClick={(e)=>{setContent(""); e.preventDefault(); e.stopPropagation();}} className='bg-red-800 cursor-pointer mr-2 px-3 py-1 text-white rounded-2xl'>Cancel</button>
            <button disabled={editpending} onClick={(e)=>{handleForm(post.id);e.preventDefault(); e.stopPropagation();}  } className={`bg-blue-700 cursor-pointer px-3 py-1 text-white rounded-2xl ${editpending?"cursor-not-allowed" : "cursor-pointer"}`}>{editpending?<i className="fa-solid fa-spinner"></i>:"Save"}</button>
            </div>
       </>
            :
        
        <h1 onClick={(e)=>{e.preventDefault(); e.stopPropagation();}} className='mt-2.5 font-semibold'>{post.body}</h1>}
      </div>
              {post.bookmarked?<span className='bg-yellow-400 rounded-4xl p-1 text-2xs mt-2 font-bold'><i className='fa-regular text-xs fa-bookmark'></i> Saved</span>:""}

        {imgsrc && (content==post.id)?<div className="relative">
  <img className="w-full" src={imgsrc}></img>
</div>:
<div className='relative'>
  <img className='mt-3 w-full ' src={post.image}></img>
</div>
}
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

       </div> 
      </div>
      
    </div>
      </div>
                <div className='w-1/2 mx-auto rounded-2xl bg-black opacity-100 fixed top-40 left-5 right-2'> {selectedPostId === post.id && <LikeUsers id={post.id} />}</div>
      
    </div>
  })
      }
     
    </div>
    <div className="hidden p-4 rounded-base" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">

      

    </div>
  </div>
</div>
  
  
  </>
  
}
