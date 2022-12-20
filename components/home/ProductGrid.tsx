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
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4 py-2 px-10 md:px-20 2xl:px-40'>
      {
        allPost.map((post) => (
          <Link key={post.id} href={`/product/${post.id}`} className='border rounded-lg max-w-[15rem] md:max-w-[18rem] lg:max-w-md'>
              <img className="h-96 w-80 border object-cover rounded-lg" src={post.image} alt={post.title+"-image"}/>
            <div className='p-2 flex justify-between items-center'>
              <div className='overflow-hidden'>
                <div className='font-semibold'>{post.title.slice(0,15)}</div>
                <div className='text-sm text-slate-500 overflow-hidden h-4 w-64'>{post.description}dsdsd sdsd sds ds ds..jjhj njk kkjk </div>
                <div className='text-slate-500 line-through inline-block'>{(post.price*120)/100}</div>
                <span className='ml-2 text-slate-900 font-semibold'>₹{post.price}</span>
                <span className='ml-2 text-green-500 font-semibold'>20% off</span>
                <div className='text-xs'>Delivery charges ₹70</div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default ProductGrid