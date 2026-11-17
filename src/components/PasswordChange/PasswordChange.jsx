import React, { useState } from 'react'
import Style from "./PasswordChange.module.css"
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function PasswordChange() {
    const [showpassword, setShowpassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  

 let schema = z.object({
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password Must Containt at least one capital word & one Small word & one Number & one Special Character and the least length is 8 chars"),
    newPassword:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password Must Containt at least one capital word & one Small word & one Number & one Special Character and the least length is 8 chars")
  })


  let form = useForm({
    defaultValues:{
      password:"",
      newPassword:""
    },resolver:zodResolver(schema)
  })

  let {register , handleSubmit , formState} = form

let VisablePass = form.watch("newPassword")


  async function handlePassword(values){
    try {
      setIsLoading(true)
      let {data} = await axios.patch(`https://route-posts.routemisr.com/users/change-password`,values,{
        headers:{
          token: localStorage.getItem("userToken")
        }
      })
      if(data.message=="password changed successfully"){
        Swal.fire({
          title: "Password Changed Successfully✅👌",
          text: data.message,
          icon: "success",
          draggable: true,
        })
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Swal.fire({
        title: "Failed to Change Password❌🥲",
        text: error,
        icon: "error",
        draggable: true
      })
    }
  }









  return <>
  <form onSubmit={handleSubmit(handlePassword)} className='bg-white w-[95%] md:w-1/2 mx-auto mt-10 p-5 rounded-4xl'>
  <div className='flex gap-2'>
    <div className='bg-blue-200 rounded-full p-2'><i className='fa-solid text-blue-500  fa-key'></i></div>
  <h1 className='text-3xl font-bold'>Change Password</h1>
  </div>
    <div className="mb-5 mt-3">
    <label htmlFor="password" className="block mb-2.5 font-bold text-heading">Current Password</label>
    <div className='relative'>
      <input {...register('password')} type="password"  id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your Password"  />
      {formState.errors.password && formState.touchedFields.password?<p className='font-bold text-red-900'>{formState.errors.password.message}</p>:""}
    </div>
        <label htmlFor="newPassword" className="mt-5 block mb-2.5 font-bold  text-heading">New Password</label>
    <div className='relative'>
      <input {...register('newPassword')} type={showpassword?"text": "password"} id="newPassword" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your Password"  />
      {VisablePass.length>0?<i onClick={()=>{setShowpassword(!showpassword)}} class={`fa-solid ${showpassword?"fa-eye-slash":"fa-eye"} absolute top-3 right-3 cursor-pointer`}></i>: ""}
            {formState.errors.newPassword && formState.touchedFields.newPassword?<p className='font-bold text-red-900'>{formState.errors.newPassword.message}</p>:""}

    </div>
    
  </div>
  <button disabled={isLoading} type='submit' className='cursor-pointer bg-blue-600 w-full text-white py-2 rounded-2xl'>{isLoading?<i className="fa-solid fa-spinner"></i>:"Updating Password"}</button>
  </form>
  </>
}
