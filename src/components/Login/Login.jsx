import React, { useContext, useState } from 'react'
import Style from "./Login.module.css"
import {useForm} from "react-hook-form"
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import Swal from 'sweetalert2'
import {Link, useNavigate} from "react-router-dom"
import { CounterContext } from '../../Context/CounterContext';
export default function Login() {

  const [isloading, setIsloading] = useState(false)
  const [showpassword, setShowpassword] = useState(false)

let navigate = useNavigate()

let {setMyToken} = useContext(CounterContext)

  let schema = z.object({
  email: z.email("Enter Valid Email"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password Must Containt at least one capital word & one Small word & one Number & one Special Character and the least length is 8 chars"),
})



  let form = useForm({
    defaultValues:{
      email:"",
      password:"",
    },
    resolver: zodResolver(schema)
  })



let {register , handleSubmit , formState} = form

let VisablePass = form.watch("password")

async function handleLogin(values){
  console.log(values);
  try {
    setIsloading(true)
    let {data} = await axios.post(`https://route-posts.routemisr.com/users/signin`,values)
    console.log(data);
    setMyToken(data.data.token)
    localStorage.setItem("userToken" , data.data.token)
    if(data.message == "signed in successfully"){
      Swal.fire({
  title: "Success✅👌",
  text: data.message,
  icon: "success",
  draggable: true,
}).then(()=>{
  setTimeout(()=>{
    navigate("/")
  },1000)
});
    }
   setIsloading(false) 
  } catch (error) {
    setIsloading(false) 
    console.log(error.response);
     Swal.fire({
  title: "Failed❌🥲",
  text: error.response.data.message,
  icon: "error",
  draggable: true
})
  }
  
}







  return <>
  

<form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto mt-10 bg-white p-5 rounded-4xl  shadow-lg shadow-dark-soft">
 

{/* email */}
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your Email</label>
    <input type="email" {...register("email")} id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Email"  />
         {formState.errors.email && formState.touchedFields.email?<p className='font-bold text-red-900'>{formState.errors.email.message}</p>:""}
  </div>



  

{/* password */}
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your Password</label>
    <div className='relative'>
      <input type={showpassword?"text": "password"} {...register("password")} id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your Password"  />
      {VisablePass.length>0?<i onClick={()=>{setShowpassword(!showpassword)}} class={`fa-solid ${showpassword?"fa-eye-slash":"fa-eye"} absolute top-3 right-3 cursor-pointer`}></i>: ""}
    </div>
           {formState.errors.password && formState.touchedFields.password?<p className='font-bold text-red-900'>{formState.errors.password.message}</p>:""}

  </div>












  
  <button disabled={isloading} type="submit" className={`text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ${isloading?"cursor-not-allowed": "cursor-pointer"}`}>{isloading?<i className="fa-solid fa-spinner"></i>:"Submit"}</button>
</form>
<div className='mt-6  text-center'>  <Link to={"/register"} className=' bg-black p-3 rounded-2xl text-white font-semibold' >Don't Have an account? Register Now!</Link>
</div>


  </>
}
