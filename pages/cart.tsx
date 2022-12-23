import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AuthContext from '../Authentication/AuthContext'
import Header from '../components/home/Header'
import { useContext } from 'react'
import absoluteUrl from 'next-absolute-url'
const cat = [
  {
    id: "3i7rDU4N4JyEDuvS2DEZ",
    size: "36"
  },
  {
    id: "3i7rDU4N4JyEDuvS2DEZ",
    size: "38"
  },
  {
    id: "GRVuD8jsylBvi8H1VWB6",
    size: "36"
  },
  {
    id: "GRVuD8jsylBvi8H1VWB6",
    size: "36"
  }
]
function cart() {
  const { cart, setCart } = useContext(AuthContext);
  const [showCart,setShowCart]=useState<object[]>([]);
  useEffect(() => {
    const get = () => {
      let tempCart: object[] = [];
      cart.map(async (e: any) => {
        console.log(e.id);
        const resX = await fetch("/api/getProductById", {
          method: 'post',
          body: JSON.stringify({ id: e.id })
        })
        tempCart = [{ ...await resX.json(), ...e },...tempCart];
        setShowCart([...tempCart]);
      })
    }
    get();
  }, [])
  const getQtyCount=(e:any)=>{
    let x=[];
    let z=e.product.size.findIndex((x:{label:String,pieces:string})=>x.label==e.size);
    for(let i=1;i<=e.product.size[z].pieces;i++)
    {
      x.push(i);
    }
    return x;
  }
  return (
    <div>
      <Head>
        <title>
          Your Cart(3)
        </title>
      </Head>
      <Header />
      <div className='max-w-3xl mx-auto text-xs sm:text-base p-2 space-y-2'>
        {
          showCart.map((e:any,i) => (
            <div key={e.id+"-"+i} className='border rounded-lg p-4 flex justify-between'>
              <div className='flex'>
                <img className="rounded-lg object-cover h-28 w-24 sm:h-32" src={e.product.image} />
                <div className='ml-6'>
                  <div className='font-medium'>{e.product.title.slice(0, 25)}..</div>
                  <div className=''>
                    <div className='bg-slate-200 p-1 inline-block rounded-lg'>
                      <div className='inline-block font-medium'>Size:</div>
                      <select value={e.size} className='bg-slate-200'>
                        {
                          e.product.size.map((z:{label:string,pieces:string})=>(
                            <option>{z.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='bg-slate-200 p-1 mt-2 ml-2 inline-block rounded-lg'>
                      <div className='inline-block font-medium'>Qty:</div>
                      <select value={e.qty} className='bg-slate-200'>
                        {
                          [...getQtyCount(e)].map((z)=>(
                            <option value={z}>{z}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='inline-block font-bold'>{e.product.price}</div>
                    <div className='inline-block line-through ml-2 text-slate-500'>₹{(e.product.price * 120) / 100}</div>
                    <div className='inline-block ml-2 text-red-500'>20% OFF</div>
                  </div>
                </div>
              </div>
              <img className="h-[1.2rem]" src='https://img.icons8.com/puffy/32/ff0000/experimental-trash-puffy.png' />
            </div>
          ))
        }
        <div className='border' />
        <div className='border rounded-lg p-3 text-sm sm:text-base'>
          <div className='font-semibold'>Product Details(3 items)</div>
          <div className='flex justify-between'>
            <div>Total MRP</div>
            <div>₹4796</div>
          </div>
          <div className='flex justify-between'>
            <div>Discount MRP</div>
            <div className='text-green-500'>-₹496</div>
          </div>
          <div className='flex justify-between'>
            <div>Delivery Charges</div>
            <div>₹70</div>
          </div>
          <div className='border my-2' />
          <div className='flex justify-between font-bold'>
            <div>Total Amount</div>
            <div>₹5000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default cart