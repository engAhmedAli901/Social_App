import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";




export let FriendsContext = createContext()


export function FriendsContextProvider({children}){

    let queryclient = useQueryClient()


    function getFriends(){
      return axios.get(`https://route-posts.routemisr.com/users/suggestions?limit=50`,{
        headers:{
          token: localStorage.getItem("userToken")
        }
      })
    }
    
    
    let {data:SuggestedFriends} = useQuery({
      queryFn:getFriends,
      queryKey:["Suggested"],
      select:(data)=>data?.data?.data?.suggestions
    })
    
    console.log(SuggestedFriends);








    function FollowFriend(id){
        return axios.put(`https://route-posts.routemisr.com/users/${id}/follow`,{},{
            headers:{
                token: localStorage.getItem("userToken")
            }
        })
    }



    let {mutate , isPending} = useMutation({
        mutationFn:FollowFriend,
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:["Profile"]
            })
            queryclient.invalidateQueries({
                queryKey:["AllPosts"]
            })
             queryclient.invalidateQueries({
                queryKey:["Suggested"]
            })
        }
    })










    return <FriendsContext.Provider value={{SuggestedFriends , mutate , isPending}}>
        {children}
    </FriendsContext.Provider>
}