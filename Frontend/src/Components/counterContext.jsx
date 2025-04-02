import React, { useState } from 'react'
import { useContext } from 'react'
export const conterContext = useContext(null);
export const counterProvider=(props)=>{
    const [count,setCount] = useState(5);
  return (
    <conterContext.Provider value={{count, setCount, name:"Aayush"}}>
        {props.children}
    </conterContext.Provider> )
}

export default counterContext