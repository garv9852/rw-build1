import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import {Navigate} from "react-router-dom"
import Router from 'next/router';
function ProtectRoute({children}) {
    const authent=useContext(AuthContext);
    console.log(Element);
    const x=()=>{
      Router.push("./login");
    }
  return (
  <>
      {
        authent.user?(
          {children}
        )
        :
        x()
      }
  </>);
}

export default ProtectRoute;


