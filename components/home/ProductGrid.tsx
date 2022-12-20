import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import cartImage from "../../rawImage/Cart.jpg"
interface post{
  id?:string,
  image:string,
  title:string,
  description:string,
  fabric:string,
  price:number,
  size:Object[]

}
function ProductGrid() {
  const [allPost,setAllpost]=useState<post[]>([]);
  useEffect(()=>{
    const getFun=async ()=>{
      const x=await fetch("/api/getProduct",{
        method:"get"
      })
      const product={...await x.json()}.product;
      setAllpost(product);
    }
    getFun();
  },[])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4 py-2 px-10 md:px-30 2xl:px-40'>
      {
        allPost.map((post) => (
          <Link key={post.id} href="/" className='border rounded-lg max-w-[15rem] md:max-w-[18rem] lg:max-w-md'>
            <div >
              <img className="'border rounded-lg" src={post.image} alt={post.title+"-image"}/>
            </div> 
            <div className='p-5'>
              <div className='text-xl h-8 overflow-hidden'>{post.title.slice(0,60)}...</div>
              <div className='text-xl font-sans font-bold text-red-500'>₹ {post.price}.00</div>
              <div className='flex justify-end'>
                <Image src={cartImage} className="h-10 w-10 " alt="cart-image"/>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default ProductGrid