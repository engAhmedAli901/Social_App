import React, { useState } from 'react'
import Style from "./Register.module.css"
import {useForm} from "react-hook-form"
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import Swal from 'sweetalert2'
import {Link, useNavigate} from "react-router-dom"
export default function Register() {

  const [isloading, setIsloading] = useState(false)
  const [showpassword, setShowpassword] = useState(false)

let navigate = useNavigate()

  let schema = z.object({
  name: z.string().min(3,"The minimum length is 3 chars").max(20,"the Maximum length is 20 chars"),
  username: z.string().min(3,"The minimum length is 3 chars").max(20,"the Maximum length is 20 chars"),
  email: z.email("Enter Valid Email"),
  dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date)=>{
    let userDate = new Date(date)
    let nowDate = new Date()
    nowDate.setHours(0,0,0,0)
    return userDate < nowDate
  },"Can't Enter Future Date"),
  gender: z.enum(["male","female"] , "Enter Male or Female"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password Must Containt at least one capital word & one Small word & one Number & one Special Character and the least length is 8 chars"),
  rePassword: z.string()
}).refine((obj)=>{
  return obj.password===obj.rePassword
},{
  error:"The Password and RePassword must be same",
  path:["rePassword"]
})



  let form = useForm({
    defaultValues:{
      name:"",
      username:"",
      email:"",
      dateOfBirth:"",
      gender:"",
      password:"",
      rePassword:""
    },
    resolver: zodResolver(schema),
    mode:"onTouched"
  })



let {register , handleSubmit , formState} = form

let VisablePass = form.watch("password")

async function handleRegister(values){
  console.log(values);
  try {
    setIsloading(true)
    let {data} = await axios.post(`https://route-posts.routemisr.com/users/signup`,values)
    console.log(data);
    if(data.message=="account created"){
      Swal.fire({
  title: "Success✅👌",
  text: data.message,
  icon: "success",
  draggable: true,
}).then(()=>{
  setTimeout(()=>{
    navigate("/login")
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
  

<form onSubmit={handleSubmit(handleRegister)} className="max-w-md mx-auto mt-10 bg-white p-5 rounded-4xl  shadow-lg shadow-dark-soft">
  {/* name */}
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your Name</label>
    <input type="text" {...register("name")} id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Full Name"  />
    {formState.errors.name && formState.touchedFields.name?<p className='font-bold text-red-900'>{formState.errors.name.message}</p>:""}
  </div>
  


{/* username */}
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2.5 text-sm font-medium text-heading">UserName</label>
    <input type="text" {...register("username")} id="username" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="UserName"  />
     {formState.errors.username && formState.touchedFields.username?<p className='font-bold text-red-900'>{formState.errors.username.message}</p>:""}
  </div>





{/* email */}
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your Email</label>
    <input type="email" {...register("email")} id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Email"  />
         {formState.errors.email && formState.touchedFields.email?<p className='font-bold text-red-900'>{formState.errors.email.message}</p>:""}
  </div>



  

{/* dateOfBirth */}
  <div className="mb-5">
    <label htmlFor="dateOfBirth" className="block mb-2.5 text-sm font-medium text-heading">Birth Date</label>
    <input type="date" {...register("dateOfBirth")} id="dateOfBirth" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
         {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth?<p className='font-bold text-red-900'>{formState.errors.dateOfBirth.message}</p>:""}
  </div>



  {/* gender */}
  <div className="flex items-center mb-4 gap-3">
  <div>
    <input id="male" type="radio"{...register("gender")} defaultValue="male" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" defaultChecked />
  <label htmlFor="male"  className="select-none ms-2 text-sm font-medium text-heading">
    Male
  </label>
       {formState.errors.gender && formState.touchedFields.gender?<p className='font-bold text-red-900'>{formState.errors.gender.message}</p>:""}

  </div>

  <div>
    <input id="female" type="radio"{...register("gender")} defaultValue="female" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"  />
  <label htmlFor="female" className="select-none ms-2 text-sm font-medium text-heading">
    Female
  </label>
         {formState.errors.gender && formState.touchedFields.gender?<p className='font-bold text-red-900'>{formState.errors.gender.message}</p>:""}

  </div>
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


  {/* repassword */}
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">Your RePassword</label>
    <input type="password" {...register("rePassword")} id="rePassword" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your RePassword"  />
           {formState.errors.rePassword && formState.touchedFields.rePassword?<p className='font-bold text-red-900'>{formState.errors.rePassword.message}</p>:""}

  </div>










  
  <button disabled={isloading} type="submit" className={`text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ${isloading?"cursor-not-allowed": "cursor-pointer"}`}>{isloading?<i className="fa-solid fa-spinner"></i>:"Submit"}</button>
</form>
<div className='mt-6  text-center'>  <Link to={"/login"} className=' bg-black p-3 rounded-2xl text-white font-semibold' > Have an account? Login Now!</Link>
</div>
  </>
}
