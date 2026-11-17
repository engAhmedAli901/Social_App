import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";



export let DeleteContext = createContext()

export default function DeleteContextProvider({children}){

    let queryclient = useQueryClient()


    function DeletePost(id){
        return axios.delete(`https://route-posts.routemisr.com/posts/${id}`,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }


    let {mutate , isPending} = useMutation({
        mutationFn:DeletePost,
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:["posts"]
            })
            queryclient.invalidateQueries({
                queryKey:["Profile"]
            })
            queryclient.invalidateQueries({
                queryKey:["postdetails"]
            })
            toast.success('Successfully Deleted!');
    },
    onError:()=>{
      toast.error('This is an error!');
    }
    })


    function DeleteOperation(id){
        mutate(id)
    }






    return <DeleteContext.Provider value={{DeleteOperation , isPending}}>
        {children}
    </DeleteContext.Provider>
}