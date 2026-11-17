
import React, { useContext, useState } from "react";
import Style from "./Navbar.module.css";
import { CounterContext } from "../../Context/CounterContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const [active, setActive] = useState(localStorage.getItem("active")||"")

  let navigate = useNavigate()

    let {myToken , setMyToken} = useContext(CounterContext)
    let {data} = useContext(UserContext)


    function signout(){
      navigate("/login")
      localStorage.removeItem("userToken")
      setMyToken(null)
    }
  


  return <>
  

<nav className=" w-[95%] border border-gray-300 mb-3 bg-white rounded-4xl mt-4 mx-auto z-20 md:w-1/2 sm:w-full">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div>
      <h1 className="font-bold text-xl">Social App</h1>
    </div>
   


    {/* user details */}

    {myToken?<>
      <ul className="font-medium flex   md:p-0 mt-4   rounded-base mb-2 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
        <li>
          <Link to={"/"} onClick={()=>{
            setActive("home");
            localStorage.setItem("active","home")
          }} className={`${active=="home"?"text-blue-600":"text-black"} font-bold text-lg block py-2 px-3 text-black  rounded  md:p-0`} aria-current="page"><i class="fa-regular text-lg fa-house"></i> <span className="hidden lg:inline">Home</span></Link>
        </li>
       <li>
          <Link to={"/profile"}  onClick={()=>{
            setActive("profile")
             localStorage.setItem("active","profile")
          }}  className={`${active=="profile"?"text-blue-600":"text-black"} font-bold text-lg block py-2 px-3 text-black  rounded  md:p-0`} aria-current="page"><i class="fa-regular text-lg fa-user"></i> <span className="hidden lg:inline">Profile</span></Link>
        </li>
        <li>
          <Link to={"/notifications"}  onClick={()=>{
            setActive("notification")
             localStorage.setItem("active","notification")
          }} className={`${active=="notification"?"text-blue-600":"text-black"} font-bold text-lg block py-2 px-3 text-black  rounded  md:p-0`} aria-current="page"><i class="fa-regular text-lg fa-comment"></i> <span className="hidden lg:inline">Notification</span></Link>
        </li>
      </ul>

    
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="cursor-pointer flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={data?.photo} alt="user photo" />
      </button>
      {/* Dropdown menu */}
      <div className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="user-dropdown">
        <div className="px-4 py-3 text-sm border-b border-default">
          <span className="block text-heading font-medium">{data?.name}</span>
          <span className="block text-body truncate">{data?.email}</span>
        </div>
        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
          <li>
            <Link to={"/profile"} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profile</Link>
          </li>
          <li>
            <Link to={"/settings"} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Settings</Link>
          </li>
          <hr className="text-gray-300"/>
          <li>
            <span onClick={()=>{signout()}} className="text-red-600 cursor-pointer inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Log out</span>
          </li>
        </ul>
      </div>
    </div>
    </>: ""}

    {/* end user details */}

    
  </div>
</nav>


  </>
}
