import React, { useState } from 'react'
import Style from "./UpdateComment.module.css"
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export default function UpdateComment({postid5 , commentid5 , Subject , Photo}) {

  let queryclient = useQueryClient()

   const [body, setBody] = useState(Subject || "")
    const [image, setImage] = useState("")
    const [imgsrc, setImgsrc] = useState(Photo||"")

console.log(Subject);

  function UpdateComment(formdata){
    return axios.put(`https://route-posts.routemisr.com/posts/${postid5}/comments/${commentid5}`,formdata,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


let {mutate , isPending} = useMutation({
  mutationFn:(formdata)=>UpdateComment(formdata),
  onSuccess:()=>{
    queryclient.invalidateQueries({
      queryKey:["PostComments"]
    })
  }
})


function handleImg(image){
  setImage(image)
  setImgsrc(URL.createObjectURL(image))
}

function handleForm(){
  let formdata = new FormData()
  if(image)formdata.append("image",image) 
  if(body)formdata.append("content",body) 
    mutate(formdata)
}




  return <>




<div
          className="w-full  rounded-2xl  bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
          data-comment-mention-root="true"
        >
          <textarea
          onChange={(e)=>setBody(e.target.value)}
            placeholder={`Comment as ...`}
            rows={1}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
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
              className="px-4 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100 cursor-pointer"
              disabled={(!body.trim()&&!image) || isPending}
            >
              {isPending?
              "..."
              :
             "Update"
              }
            </button>
            
          </div>
          {imgsrc?
      <div className="w-fit mx-auto relative ">
        <img className="rounded-2xl mt-2 " src={imgsrc }  />
        <i onClick={()=>{
          setImage("");
          setImgsrc("")
        }} className="absolute top-3 right-3 fa-solid fa-xmark rounded text-white"></i>
      </div>
      
      : ""}
        </div>






  </>
}
