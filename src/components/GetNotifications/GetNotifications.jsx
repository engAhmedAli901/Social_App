import React, { useState } from 'react'
import Style from "./GetNotifications.module.css"
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
export default function GetNotifications() {

let queryclient = useQueryClient()

const [notificationType, setNotificationType] = useState(false)
const [active, setActive] = useState(false)
  // functions

 async function GetNotifications(){
    return await axios.get(`https://route-posts.routemisr.com/notifications?=false&page=1&limit=50`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


  
async function GetUnreadCount(){
    return await axios.get(`https://route-posts.routemisr.com/notifications/unread-count`,{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


   function MarkNotificationAsRead(id){
    return  axios.patch(`https://route-posts.routemisr.com/notifications/${id}/read`,{},{
      headers:{
  Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
  }


   function MarkAllAsRead(){
    return  axios.patch(`https://route-posts.routemisr.com/notifications/read-all`,{},{
      headers:{
        token: localStorage.getItem("userToken")
      }
    })
  }


  // queries & mutations


  let {data:NotificationData , isPending:NotificationIsPending , error:NotificationError , isError:NotificationIsError} = useQuery({
    queryKey:["GetNotifications"],
    queryFn:GetNotifications,
    select:(data)=>data?.data?.data?.notifications
  })

  let {data:UnReadData , isPending:UnReadIsPending , error:UnReadError , isError:UnReadIsError} = useQuery({
    queryKey:["GetUnreadCount"],
    queryFn:GetUnreadCount,
    select:(data)=>data?.data?.data?.unreadCount
  })


  let {mutate} =  useMutation({
    mutationFn:(id)=>MarkNotificationAsRead(id),
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["GetNotifications"]
      })
       queryclient.invalidateQueries({
      queryKey: ["GetUnreadCount"]
    })
    }
  })



  let {mutate:ReadAll} =  useMutation({
    mutationFn:MarkAllAsRead(),
    onSuccess:()=>{
      queryclient.invalidateQueries({
        queryKey:["GetNotifications"]
      })
       queryclient.invalidateQueries({
      queryKey: ["GetUnreadCount"]
    })
    }
  })











function handleMutation(id){
  mutate(id)
}

function AllRead(){
  ReadAll()
}

let UnreadNotifications = NotificationData?.filter((notification) => {
  return notification.isRead === false;
});

  console.log(NotificationData);
  console.log(UnReadData);
  


  return <>
  <div>
    <div className='bg-white md:w-[90%] mx-auto p-5 rounded-3xl mt-5 w-[95%]'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>Notifications</h1>
          <p className='text-sm text-gray-500'>Realtime updates for likes, comments, shares, and follows.</p>
        </div>
        <div><button onClick={()=>AllRead()} className='cursor-pointer hover:bg-gray-400 bg-gray-300 rounded px-4 py-2'><i class="fa-solid fa-check-double"></i> Mark all as read</button></div>
      </div>
      <div className='mt-4 '>
        <button onClick={()=>{setNotificationType(false); setActive(false)}} className={`${active?"text-black  bg-gray-200":"text-white bg-blue-600"} font-bold px-4 rounded-3xl py-1 mr-3 cursor-pointer`}>All</button>
        <button onClick={()=>{setNotificationType(true); setActive(true)}} className={`${active?"text-white bg-blue-600":"text-black bg-gray-200"} font-bold px-4 rounded-3xl py-1 cursor-pointer`}>Unread <span className='text-blue-500 bg-white rounded-2xl px-3 text-sm ml-2'>{UnReadData}</span></button>
        <hr  className='mt-4  font-light text-gray-300'/>
      </div>
      {notificationType?UnreadNotifications :NotificationData?.map((notification)=>{
      return <div>
        <div className='flex gap-1 mt-5 bg-[#EDF4FF] p-5 rounded-2xl w-[95%] mx-auto'>
          <div>
            <img className='w-[50px] h-[50px] rounded-full' src={notification.actor.photo}></img>
          </div>
          <div>
            <h1 className='font-bold'>{notification.actor.name} <span className=''>{(notification.type).split("_")[0]} on your Post</span></h1>
            <p className='text-sm text-gray-500'>{notification.entity.body}</p>
                    <div><button onClick={()=>handleMutation(notification._id)} className={` rounded px-2 text-sm mt-3 ${notification?"bg-white text-green-600": "text-blue-500 bg-white  hover:bg-blue-500 hover:text-white"}`}><i class="fa-solid fa-check text-xs"></i>{notification?" Read": " Mark  as read"}</button></div>

          </div>
        </div>
      </div>
    })}
    </div>


    
  </div>
  </>
}
