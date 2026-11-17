import React, { useContext, useState } from 'react'
import Style from "./Postdetails.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DeleteContext } from '../../Context/DeleteContext'
import { UserContext } from '../../Context/UserContext'
import { EditPostContext } from '../../Context/EditPostContext'
import LikePosts from '../LikePosts/LikePosts'
import LikeUsers from '../LikeUsers/LikeUsers'
import BookMark from '../BookMark/BookMark'
import CreateComment from '../CreateComment/CreateComment'
import GetReplys from '../GetReplys/GetReplys'
import CreateReply from '../CreateReply/CreateReply';
import LikeReply from '../LikeReply/LikeReply'
import DeleteComment from '../DeleteComment/DeleteComment'
import UpdateComment from '../UpdateComment/UpdateComment'
export default function Postdetails() {


const [showLikes, setShowLikes] = useState(false) 
const [showReply, setShowReply] = useState(false) 
const [replyId, setReplyId] = useState("") 
const [commentId, setCommentId] = useState("") 
const [updateComment, setUpdateComment] = useState(false) 




  let {id} = useParams()
  console.log(id);

  let navigate = useNavigate()

  let {DeleteOperation , isPending} = useContext(DeleteContext)
  let {User_id} = useContext(UserContext)



  let { mutate , isPending:editpending , setBody , body , setImage , image , setImgsrc , imgsrc} = useContext(EditPostContext)
  
    
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
  
    
  
  
  
  const [content, setContent] = useState("")
  
  

   function getSinglePost(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
  }


  let {data:singlepost , error:posterror , isError:postisError , isLoading:postisLoading} = useQuery({
    queryKey:["postdetails"],
    queryFn: getSinglePost,
    select:(data)=>data?.data?.data?.post
  })

  console.log(singlepost);

console.log(User_id);




  function getAllComments(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }




  let {data:postcomments , isLoading:commentsisLoading , isError:commentsisError , error:commentserror} = useQuery({
    queryKey:["PostComments"],
    queryFn:getAllComments,
    select:(data)=>data?.data?.data?.comments
  })
  

  console.log(postcomments);
  

if(commentsisError || postisError){
return <h1>{commentserror.message}</h1>
}


if(commentsisLoading || postisLoading){
   return <span class="loader"></span>
}

  return <>
  <div onClick={()=>{setShowLikes(false);}}>
    <div className={`mt-10 ${showLikes?`opacity-20 pointer-events-none cursor-pointer`:`pointer-events-auto`}`}>
    <div className='md:w-[50%] mx-auto mb-3 text-white'><span onClick={()=>navigate(-1)} className='cursor-pointer bg-black px-6 rounded-4xl'><i class="fa-solid fa-arrow-left-long text-sm"></i> Back</span></div>
      <div  className='bg-white  w-[95%] md:w-1/2  mx-auto  rounded-2xl'>
      <div className=''>
        <div className='p-3'>
        <div className='flex justify-between'>
          <div className='flex flex-wrap gap-1.5'>
        {<img className='w-[50px] h-[50px] object-cover rounded-full' src={singlepost?.user?.photo}></img>}
        <div>
          <p className='font-bold text-sm'>{singlepost?.user?.name}</p>
          <p className='text-xs'>@{singlepost?.user?.username}</p>
          <p className='text-xs font-semibold'>{singlepost?.createdAt.split("T")[0]}</p>
        </div>
      </div>
       <div className='flex me-3 gap-1'>
        <button onClick={(e)=>{
          e.stopPropagation();
          e.preventDefault();
        }} className='bg-black text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl cursor-pointer'><BookMark id={singlepost.id} /></button> 
        {singlepost?.user?._id == User_id? 
        
        <>
        <button onClick={(e)=>{  e.preventDefault(); e.stopPropagation(); setContent(singlepost.id); setBody(singlepost.body); setImgsrc(singlepost.image)}}  className='cursor-pointer bg-green-700 text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl'><i className="fa-solid mt-2 fa-pen"></i></button>
        <button onClick={(e)=>{  e.preventDefault(); e.stopPropagation(); DeleteOperation(id) ; navigate("/")}} className='cursor-pointer bg-red-700 text-white px-4 text-xs font-bold pb-2 h-fit rounded-2xl'><i className={`fa-regular mt-2 ${isPending?"fa-spinner":"fa-trash-can"}`}></i></button>
        </>
        
        : ""}
       </div>
        </div>
      {content==singlepost.id?
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
            {singlepost.body}
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
            <button disabled={editpending} onClick={(e)=>{handleForm(singlepost.id);e.preventDefault(); e.stopPropagation();}  } className={`bg-blue-700 cursor-pointer px-3 py-1 text-white rounded-2xl ${editpending?"cursor-not-allowed" : "cursor-pointer"}`}>{editpending?<i className="fa-solid fa-spinner"></i>:"Save"}</button>
            </div>
       </>
            :
        
        <h1 onClick={(e)=>{e.preventDefault(); e.stopPropagation();}} className='mt-2.5 font-semibold'>{singlepost.body}</h1>}
        {singlepost.isShare?
        <div className="rounded-xl mt-5 mx-auto border border-slate-200 bg-slate-50 p-3">
            <div>
            <div className="flex items-center gap-2">
              <img
                alt="MrMo"
                className="h-8 w-8 rounded-full object-cover"
                src={singlepost?.sharedPost.user.photo}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {singlepost?.sharedPost.user.name}
                </p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  @{singlepost?.sharedPost.user.username}
                </p>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
              {singlepost?.sharedPost.body}
            </p>
            {singlepost?.sharedPost.image?<img
              alt="post preview"
              className="mt-2  w-full rounded-lg object-cover"
              src={singlepost?.sharedPost.image}
            />:""}
            </div>
          </div>
        :
        ""
        }
      </div>
                      {singlepost.bookmarked?<span className='bg-yellow-400 rounded-4xl p-1 text-2xs mt-2 font-bold'><i className='fa-regular text-xs fa-bookmark'></i> Saved</span>:""}

      </div>
        {imgsrc && (content==singlepost.id)?<div className="relative">
  <img className="w-full" src={imgsrc}></img>
</div>:
<div className='relative'>
  <img className='mt-3 w-full ' src={singlepost.image}></img>
</div>
}

        <div className='w-[95%] mt-3 mx-auto flex justify-between'>
          <span ><i className="fa-solid fa-thumbs-up  text-blue-700 rounded-full   "></i><span onClick={(e)=>{
            e.stopPropagation();
            e.preventDefault();
            setShowLikes(true)
          }} className='cursor-pointer hover:underline hover:underline-offset-2 hover:text-blue-500'>{singlepost.likesCount} Likes</span></span>          <div className='flex gap-3'>
          <span className=''><i className="fa-solid fa-retweet  text-black rounded-full   "></i> {singlepost.sharesCount} shares</span>
          <span className=''><i className="fa-regular fa-message  text-black rounded-full   "></i> {singlepost.commentsCount} comments</span>
          </div>
        </div>
        <hr className='w-[95%] mx-auto mt-3 text-gray-200'/>
        <div className='w-[80%] mx-auto mt-3 flex justify-between'>
         <LikePosts id={singlepost.id}/>
          <span className='text-lg'><i className="fa-regular fa-message  rounded-full  text-xl "></i>Comment</span>
          <span className='text-lg'><i className="fa-solid fa-retweet  rounded-full  text-xl "></i>Share</span>
        </div>
                <CreateComment id={singlepost.id} />
        
      {singlepost?.commentsCount>0?<>
      {postcomments?.map((comment)=>{
       return (
        <div className='pb-2'>
                  
        <div className='bg-[#F0F2F5] flex mx-5 mt-5  rounded-t-2xl rounded-br-2xl gap-2 p-2 '>
          <div>
             {<img className='w-[40px] h-[40px] rounded-full border-2 border-green-600' src={comment?.commentCreator?.photo}></img>}
          </div>
         <div className='flex  justify-between w-full'>
           <div className=' w-full'>
           <Link to={`/userprofile/${comment?.commentCreator?._id}`}><p className='hover:underline hover:underline-offset-2 font-bold text-xs'>{comment?.commentCreator?.name}</p></Link>
          <p className='text-xs font-semibold'>{comment?.commentCreator?.username}</p>
<p className='text-xs'>
  {new Date(comment?.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })}
</p>


            {updateComment && comment?._id==commentId?
<UpdateComment postid5={singlepost._id} commentid5={comment._id} Subject={comment.content} Photo={comment?.image} />
:
<div>
  <p className='font-semibold '>{comment?.content}</p>
<div className="w-fit mx-auto relative ">
        <img className="rounded-2xl mt-2 " src={comment?.image}  />
        </div>
</div>
}
          </div>
          <div>
           <div className='flex gap-1'>
            {comment?.commentCreator?._id==User_id || singlepost.user._id==User_id? <DeleteComment postid4={singlepost?._id} commentid4={comment?._id} />:""}
            <div onClick={()=>{setUpdateComment(!updateComment);
              setCommentId(comment?._id)
            }}>{comment?.commentCreator?._id==User_id?<div className='cursor-pointer hover:bg-green-600 bg-green-700 rounded-full px-1'><i className={` text-white text-2xs fa-solid ${updateComment?"fa-xmark":"fa-pen"}`}></i></div>:""}</div>
           </div>
          </div>
         </div>
        </div>
        <div className=' w-[90%] mx-auto flex gap-4'>
          {<LikeReply commentid3={comment?._id} postid3={singlepost.id} count={comment.likes.length} />}
          <p onClick={()=>{
            setShowReply(!showReply);
            setReplyId(comment?._id)
          }} className={`${showReply && replyId==comment?._id?"text-blue-600":"text-gray-500"} text-xs cursor-pointer font-bold  hover:text-blue-700 hover:underline hover:underline-offset-2`}>{showReply && replyId==comment?._id?"hide Replies":`Reply (${comment.repliesCount})`}</p>
        </div>
        {showReply && replyId==comment?._id ? <GetReplys  CommentId={comment?._id} PostId={singlepost.id} /> : ""}
        {showReply && replyId==comment?._id ? <CreateReply  CreateId={comment?._id} PostId2={singlepost.id} /> : ""}
      </div>
      
       )
      })}
      </>
      :""}
        
      </div>
    </div>
  </div>
{showLikes && (
  <div
  onClick={(e) => e.stopPropagation()}
  className='w-1/2 mx-auto rounded-2xl bg-black fixed top-40 left-5 right-2 z-50'
>
  <LikeUsers id={singlepost.id} />
  
</div>
)}  </>
}
