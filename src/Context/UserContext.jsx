import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";




export let UserContext = createContext()


export default function UserContextProvider({children}){


     function ProfileDetailes(){
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


  

  let {data , isError , isLoading , error} = useQuery({
    queryKey:["Profile"],
    queryFn: ProfileDetailes,
    select:(data)=>data?.data?.data?.user
  })

  console.log(data);

  let User_id = data?.id

function ProfilePosts(){
    return axios.get(`https://route-posts.routemisr.com/users/${data.id}/posts`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


  let {data:MyDetails , isError:MyDetailsisError , isLoading:MyDetailsIsLoading , error:MyDetailserror} = useQuery({
    queryKey:["posts"],
    queryFn: ProfilePosts,
    select:(data)=>data?.data?.data?.posts
  })


  console.log(MyDetails);
  

   return <UserContext.Provider value={{data , MyDetails , User_id}}>
        {children}
    </UserContext.Provider>
}