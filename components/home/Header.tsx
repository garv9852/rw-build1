import Image from 'next/image';
import Link from 'next/link';
import logo from "../../rawImage/logo.png"
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Authentication/AuthContext';
import Router from 'next/router'
function Header() {
  const [small, setSmall] = useState("");
  const [logedIn, setLogedIn] = useState(false);
  const { user, logout, cart, setCart } = useContext(AuthContext);
  useEffect(() => {
    const check = () => {
      if (user != null)
        setLogedIn(true);
    }
    check();
  }, [user])
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50)
        setSmall("shadow-lg")
      else if (window.scrollY < 50)
        setSmall("")
    }
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleLogedOut = () => {
    logout();
    setLogedIn(false);
  }
  return (
    <header className={`sticky top-0 z-50 px-2 transition ease-in-out duration-300 bg-white ${small}`}>
      <div className='py-2 flex justify-between max-w-7xl mx-auto'>
        <div className='flex flex-row items-center'>
          <Link href="/">
            <Image src={logo} alt="logo" className="w-16 object-contain sm:w-20 md:w-20" />
          </Link>
          <div className='hidden md:inline-flex flex flex-row items-center'>
            <Link href="/about" className='ml-4 font-medium'>About</Link>
            <Link href="/contact" className='ml-4 font-medium'>Contact</Link>
            <Link href="" className='ml-4'>
              <div className="bg-red-500 font-medium pt-1 pb-1 pl-4 pr-4 rounded-3xl text-white">Follow</div>
            </Link>
          </div>
        </div>
        <div className='transtion duration-300 ease-in-out flex flex-row items-center'>
          {
            logedIn ?
              (
                <div className='flex'>
                  <div className='flex items-center'>
                    <div className="flex justify-center md:block">
                      <div className="relative text-gray-700 hover:text-gray-600">
                        <svg onClick={()=>Router.push("/cart")} className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        {
                          cart.length != 0 && <span className="absolute top-0 left-0 rounded-full bg-red-500 text-white p-1 text-xs"></span>
                        }
                      </div>
                    </div>
                  </div>
                  <div className='rounded-lg p-1'>
                    <div onClick={handleLogedOut} className='w-8 h-8 rounded-2xl bg-slate-300'></div>
                  </div>
                </div>
              )
              :
              (
                <>
                  <div className="flex justify-center md:block">
                      <div className="relative text-gray-700 hover:text-gray-600">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        {
                          cart.length != 0 && <span className="absolute top-0 left-0 rounded-full bg-red-500 text-white p-1 text-xs"></span>
                        }
                      </div>
                    </div>
                  <Link href="/login" className='ml-3 text-red-500'>
                    <div className="text-sm sm:text-base border-2 border-red-500 pt-1 pb-1 pl-4 pr-4 rounded-3xl ">Log In</div>
                  </Link>
                </>
              )
          }
        </div>
      </div>
    </header>
  )
}

export default Header;