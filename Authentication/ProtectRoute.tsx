import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import Router from 'next/router';
interface prop{
  children?:JSX.Element[] | JSX.Element  
}
function ProtectRoute({children}:prop) {
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


