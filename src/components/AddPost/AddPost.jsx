import React, { useState } from "react";
import Style from "./AddPost.module.css";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
export default function AddPost() {



  let queryclient = useQueryClient()

  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [imgsrc, setImgsrc] = useState("")



  function CreatePost(formdata){
    return axios.post(`https://route-posts.routemisr.com/posts`,formdata,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
  }

  let { mutate , isPending } = useMutation({
    mutationFn:CreatePost,
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["Profile"]
      })
      queryclient.invalidateQueries({
        queryKey:["AllPosts"]
      })
      toast.success('Successfully created!');
      setBody("");
  setImage("");
  setImgsrc("");
    },
    onError:()=>{
      toast.error('This is an error!');
    }
  })




  function handleChange(e){
    let file = e.target.files[0]
    console.log(file);
   if(file){
     setImage(file)
    setImgsrc(URL.createObjectURL(file))
   }
  }



  function handleForm(){
    let formdata = new FormData()
    if(image)formdata.append("image",image)
    if(body)formdata.append("body",body)
    mutate(formdata)
  }










  return (
    <>
    {
    <div className=" w-full md:w-1/2 mx-auto ">
      <div className="  w-[95%] mx-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className=" mb-3 flex items-start gap-3">
          <img
            alt="Upton Humphrey"
            className="h-11 w-11 rounded-full object-cover"
            src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
          />
          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900">
              Upton Humphrey
            </p>
            {/* <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-earth"
                aria-hidden="true"
              >
                <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                <circle cx={12} cy={12} r={10} />
              </svg>
              <select className="bg-transparent outline-none">
                <option value="public">Public</option>
                <option value="following">Followers</option>
                <option value="only_me">Only me</option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="relative">


          <textarea
          value={body}
          onChange={(e)=>setBody(e.target.value)}
            rows={4}
            placeholder="What's on your mind, Upton?"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
            
          />

<div className="relative">
  <img className="w-full" src={imgsrc}></img>
  <i onClick={()=>{setImgsrc(""); setImage("")}} class={`fa-regular fa-circle-xmark absolute top-1 right-1 text-2xl text-white cursor-pointer ${imgsrc==""?"opacity-0":"opacity-100"}`}></i>
</div>

        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="relative flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
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
              <input accept="image/*" className="hidden" onChange={handleChange} type="file" />
            </label>
            {/* <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
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
                className="lucide lucide-smile text-amber-500"
                aria-hidden="true"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1={9} x2="9.01" y1={9} y2={9} />
                <line x1={15} x2="15.01" y1={9} y2={9} />
              </svg>
              <span className="hidden sm:inline">Feeling/activity</span>
            </button> */}
          </div>
          <div className="flex items-center gap-3">
            <button
            onClick={()=>{handleForm()}}
              disabled={isPending}
              className={`${isPending?"cursor-not-allowed":"cursor-pointer"} flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60`}
            >
              {isPending?<i className="fa-solid fa-spinner"></i> : "Post"}
              
            </button>
          </div>
        </div>
      </div>
    </div>
    }
      
    </>
  );
}
