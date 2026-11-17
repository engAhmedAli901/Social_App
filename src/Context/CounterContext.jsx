import { createContext, useState } from "react";


export let CounterContext = createContext()

export default function CounterContextProvider(props){

    const [myToken, setMyToken] = useState(localStorage.getItem("userToken"))


    return <CounterContext.Provider value={{setMyToken , myToken}}>
        {props.children}
    </CounterContext.Provider>
}