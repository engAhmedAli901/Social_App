import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";



export let EditPostContext = createContext()





export function EditPostContextProvider({children}){

    let queryclient = useQueryClient()


    const [body, setBody] = useState("")
      const [image, setImage] = useState("")
      const [imgsrc, setImgsrc] = useState("")


    function Edit(id , formdata){
        return axios.put(`https://route-posts.routemisr.com/posts/${id}`,formdata,{
            headers:{
                token: localStorage.getItem("userToken")
            }
        })
}


let {mutate , isPending} = useMutation({
    mutationFn:({id , formdata})=>Edit(id , formdata),
    onSuccess:()=>{
        queryclient.invalidateQueries({
            queryKey:["Profile"]
        })
        queryclient.invalidateQueries({
        queryKey:["AllPosts"]
      })
      queryclient.invalidateQueries({
        queryKey:["postdetails"]
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


    return <EditPostContext.Provider value={{mutate , isPending , setBody , body , setImage , image , setImgsrc , imgsrc}}>
        {children}
    </EditPostContext.Provider>

}