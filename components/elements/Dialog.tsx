import React from 'react'
import { props } from '../../typings'
function Dialog({children}:props) {
  return (
    <div className="transtion bg-white rounded-2xl hover:shadow-lg duration-300 p-6 max-w-sm">
        {children}
    </div>
  )
}

export default Dialog