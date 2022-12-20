import React from 'react'
import {ScaleLoader} from "react-spinners"
interface props{
    visible:boolean
}
function Loading({visible}:props) {
  return (
    <div className={`transition duration-300 ease-ini-out absolute ${!visible && "hidden"} top-0 items-center h-screen w-screen flex justify-center bg-slate-200/50`}>
        <ScaleLoader
        color="red"
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
  )
}

export default Loading