import React, { useContext, useState } from 'react'
import Style from "./FriendRequests.module.css"
import { Link } from 'react-router-dom'
import { FriendsContext } from '../../Context/FriendsConrext'
export default function FriendRequests() {

const [value, setValue] = useState("")
const [friendId, setFriendId] = useState("")

  let {SuggestedFriends  , mutate , isPending} = useContext(FriendsContext)
  const FilteredFriends = SuggestedFriends?.filter((friend) => {
  return friend.name.toLowerCase().includes(value.toLowerCase())
})




  return <>
      <div className='md:w-[50%] mx-auto mb-3 text-white'><Link to={"/"} className='bg-black px-6 rounded-4xl'><i class="fa-solid fa-arrow-left-long text-sm"></i> Back</Link></div>
  
  <div className='h-fit bg-white p-4 rounded-3xl lg:w-[50%] w-[95%] mx-auto'>
    <h1 className='text-start font-bold text-2xl mb-3'><i class="fa-solid fa-hand-holding-hand text-blue-600"></i> All Suggested Friends</h1>
    {/* input */}
    <form class="max-w-md mx-auto my-3">   
    <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input onChange={(e)=>{setValue(e.target.value)}} type="search" id="search" class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search Friends..." required />
    </div>
</form>
    <div className='flex flex-wrap justify-between'>
      {(value==""?SuggestedFriends:FilteredFriends)?.map((friend)=>{
      return <div className='md:w-[47%] '>
        <div className='cursor-pointer   hover:bg-gray-100 flex   mt-2 gap-3 p-5 border border-gray-200 rounded-3xl '>
          <img className='w-[40px] h-[40px] rounded-full' src={friend.photo} />
          <div className=' w-[150px] h-fit'>
            <Link to={`/userprofile/${friend._id}`}><p className='hover:underline hover:underline-offset-1 text-sm font-bold w-full'>{friend.name}</p></Link>
          <p className='text-xs text-gray-500'>@{friend.username}</p>
          </div>
          <div className='my-auto'>
          <button onClick={()=>{mutate(friend._id); setFriendId(friend._id)}} className='bg-blue-600 text-white rounded-4xl py-1 px-3 text-xs mb-2 cursor-pointer'>{isPending && friend._id == friendId?"Updating...":"Follow"}</button>
                  <p className='text-2xs bg-gray-300 w-fit px-2 py-1 rounded-3xl'>{friend.followersCount} Followers</p>

          </div>
        </div>
      </div>
    })}
    </div>
  </div>
  </>
}
