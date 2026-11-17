
import React, { useContext, useState } from "react";
import Style from "./Navbar.module.css";
import { CounterContext } from "../../Context/CounterContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const [active, setActive] = useState(localStorage.getItem("active")||"")
  const [showDropdown, setShowDropdown] = useState(false);

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

    
    
<div className="relative flex items-center md:order-2">
  <button
    type="button"
    onClick={() => setShowDropdown(!showDropdown)}
    className="cursor-pointer flex text-sm rounded-full focus:ring-4 focus:ring-blue-200"
  >
    <img
      className="w-8 h-8 rounded-full object-cover"
      src={data?.photo}
      alt="user photo"
    />
  </button>

  {showDropdown && (
    <div className="absolute right-0 top-full mt-3 z-50 bg-white border border-gray-200 rounded-xl shadow-lg w-52">

      <div className="px-4 py-3 text-sm border-b border-gray-200">
        <span className="block font-bold text-gray-900">
          {data?.name}
        </span>

        <span className="block text-gray-500 truncate">
          {data?.email}
        </span>
      </div>

      <ul className="p-2 text-sm font-medium">

        <li>
          <Link
            to="/profile"
            onClick={() => setShowDropdown(false)}
            className="block p-2 rounded-lg hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            onClick={() => setShowDropdown(false)}
            className="block p-2 rounded-lg hover:bg-gray-100"
          >
            Settings
          </Link>
        </li>

        <hr className="my-2 border-gray-200" />

        <li>
          <button
            onClick={() => {
              setShowDropdown(false);
              signout();
            }}
            className="w-full text-left text-red-600 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Log out
          </button>
        </li>

      </ul>
    </div>
  )}
</div>

    </>: ""}

    {/* end user details */}

    
  </div>
</nav>


  </>
}
