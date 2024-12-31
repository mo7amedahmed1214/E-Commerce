import { createContext, useState } from "react";

// *create context
export let userContext = createContext(null)


// *create component retunrn provider of context
export default function UserProvider({children}){

const [token,setToken]=useState(localStorage.getItem("token"))
function clearToken(){
    localStorage.removeItem("token")
    setToken(null)
}

    return <userContext.Provider value={{token,setToken ,clearToken}}>
        {children}
    </userContext.Provider>
}