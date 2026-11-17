import React, { useContext, useState } from 'react'
import Style from "./CreateReply.module.css"
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../../Context/UserContext'
export default function CreateReply({CreateId , PostId2}) {


  let queryclient = useQueryClient()
  let {data} = useContext(UserContext)


  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [imgsrc, setImgsrc] = useState("")

  function CreateReply(formdata){
    return axios.post(`https://route-posts.routemisr.com/posts/${PostId2}/comments/${CreateId}/replies`,formdata,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }






let { mutate , isPending } = useMutation({
    mutationFn:(formdata)=>CreateReply(formdata),
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["AllPosts"]
      })
      queryclient.invalidateQueries({
        queryKey:["PostComments"]
      })
      queryclient.invalidateQueries({
        queryKey:["postdetails"]
      })
       setBody("");
  setImage("");
  setImgsrc("");
    }
  });

  function handleImg(file){
    if(file){
      setImage(file)
      setImgsrc(URL.createObjectURL(file))
    }
  }

  function handleForm(){
    let formdata = new FormData()
    if(body)formdata.append("content",body)
    if(image)formdata.append("image",image)
      mutate(formdata)

  }



  return (
    <>
      <div className="flex items-start gap-2 w-[95%] mx-auto mt-5">
        <img
          alt="Upton Humphrey"
          className="h-9 w-9 rounded-full object-cover"
          src={data?.photo}
        />
        <div
          className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
          data-comment-mention-root="true"
        >
          <textarea
          onChange={(e)=>setBody(e.target.value)}
            placeholder={`Write your Reply...`}
            rows={1}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
            defaultValue={""}
            value={body}
          />
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image"
                  aria-hidden="true"
                >
                  <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                  <circle cx={9} cy={9} r={2} />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <input onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>handleImg(e.target.files[0])} accept="image/*" className="hidden" type="file" />
              </label>
            </div>
            <button
            onClick={()=>handleForm()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100 cursor-pointer"
              disabled={(!body.trim()&&!image) || isPending}
            >
              {isPending?
              "..."
              :
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send-horizontal"
                aria-hidden="true"
              >
                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                <path d="M6 12h16" />
              </svg>
              }
            </button>
          </div>
        </div>
        
      </div>
      {imgsrc?
      <div className="w-fit mx-auto relative ">
        <img className="rounded-2xl mt-2 " src={imgsrc}  />
        <i onClick={()=>{
          setImage("");
          setImgsrc("")
        }} className="absolute top-3 right-3 fa-solid fa-xmark rounded text-white"></i>
      </div>
      
      : ""}
    </>
  );
}
