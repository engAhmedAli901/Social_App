import './App.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import Notfound from './components/Notfound/Notfound'
import CounterContextProvider from './Context/CounterContext'
import CatchHacker from './components/CatchHacker/CatchHacker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import Postdetails from './components/Postdetails/Postdetails'
import UserContextProvider from './Context/UserContext'
import toast, { Toaster } from 'react-hot-toast';
import DeleteContextProvider from './Context/DeleteContext'
import { EditPostContextProvider } from './Context/EditPostContext'
import { FriendsContextProvider } from './Context/FriendsConrext'
import FriendRequests from './components/FriendRequests/FriendRequests'
import PasswordChange from './components/PasswordChange/PasswordChange'
import UserPosts from './components/UserPosts/UserPosts'
import SharePost from './components/SharePost/SharePost'
import GetNotifications from './components/GetNotifications/GetNotifications'


function App() {


  let query = new QueryClient()

let router = createBrowserRouter([
  {path:"" , element:<Layout /> , children:[
    {index:true , element:<CatchHacker><Home /></CatchHacker>},
    {path:"login" , element:<Login />},
    {path:"register" , element:<Register />},
    {path:"profile" , element:<CatchHacker><Profile /></CatchHacker>},
    {path:"postdetails/:id" , element:<CatchHacker><Postdetails /></CatchHacker>},
    {path:"requests" , element:<CatchHacker><FriendRequests /></CatchHacker>},
    {path:"settings" , element:<CatchHacker><PasswordChange /></CatchHacker>},
    {path:"userprofile/:id" , element:<CatchHacker><UserPosts /></CatchHacker>},
    {path:"share/:id" , element:<CatchHacker><SharePost /></CatchHacker>},
    {path:"notifications" , element:<CatchHacker><GetNotifications /></CatchHacker>},
    {path:"*" , element:<Notfound />},
  ]}
])





  return<>
    <CounterContextProvider>
          
            <QueryClientProvider client={query}>
        <UserContextProvider>
         <DeleteContextProvider>'
          <EditPostContextProvider>
             <FriendsContextProvider>
              <RouterProvider router={router}></RouterProvider>
                <Toaster />
           <ReactQueryDevtools />
             </FriendsContextProvider>
          </EditPostContextProvider>
         </DeleteContextProvider>
         </UserContextProvider>
          </QueryClientProvider>
         
    </CounterContextProvider>

    </>
}

export default App
