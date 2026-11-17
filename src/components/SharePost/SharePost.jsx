import React, { useState } from "react";
import Style from "./SharePost.module.css";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function SharePost({id , setIsShare , isShare}) {

const [body, setBody] = useState("")


  console.log(id);
  


  function ShareApi(raw , id) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${id}/share`,
      raw,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      },
    );
  }

  let { mutate , isPending } = useMutation({
    mutationFn: ({raw, id}) => ShareApi(raw, id),
   onSuccess: (response) => {
  console.log("New Post:", response.data.data);
  console.log("Full Response:", response.data);
},

  onError: (error) => {
    console.log("Share Error:", error.response?.data);
  }
  });

  
   function getSinglePost(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
  }


  let {data:singlepost , error:posterror , isError:postisError , isLoading:postisLoading} = useQuery({
    queryKey:["sharepostdetails"],
    queryFn: getSinglePost,
    select:(data)=>data?.data?.data?.post
  })

  console.log(singlepost);


  function CreateForm(){
    let raw = {
    body: body
  }
    mutate({raw, id})
  }
  

  return (
    <>
      <div className={` absolute  top-50 z-10 md:w-full max-w-[560px] rounded-2xl border border-slate-200 bg-white shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h4 className="text-base font-extrabold text-slate-900">
            Share post
          </h4>
          <button
          onClick={()=>setIsShare(!isShare  )}
            type="button"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
          >
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
              className="lucide lucide-x"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3 p-4">
          <textarea
          value={body}
            placeholder="Say something about this..."
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2]/20"
            defaultValue={""}
            onChange={(e)=>setBody(e.target.value)}
          />
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <img
                alt="MrMo"
                className="h-8 w-8 rounded-full object-cover"
                src={singlepost?.user.photo}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {singlepost?.user.name}
                </p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  @{singlepost?.user.username}
                </p>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
              {singlepost?.body}
            </p>
            {singlepost?.image?<img
              alt="post preview"
              className="mt-2 max-h-[220px] w-full rounded-lg object-cover"
              src={singlepost?.image}
            />:""}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
          <button
          onClick={()=>setIsShare(!isShare  )}
            type="button"
            className="rounded-lg cursor-pointer border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
          onClick={()=>CreateForm()}
            type="button"
            disabled={isPending}
            className={`${isPending?"cursor-not-allowed opacity-50 ": "cursor-pointer opacity-100"} inline-flex items-center rounded-lg bg-[#1877f2] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isPending?"Sharing....":"Share now"}
          </button>
        </div>
      </div>
    </>
  );
}
