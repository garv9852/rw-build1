import Head from 'next/head'
import React from 'react'
import Header from '../components/home/Header'

function cart() {
  return (
    <div>
      <Head>
        <title>
          Your Cart
        </title>
      </Head>
      <Header/>
      <div className='max-w-3xl mx-auto text-xs sm:text-base p-2 space-y-2'>
        <div className='border rounded-lg p-4 flex justify-between'>
          <div className='flex'>
            <img className="rounded-lg object-cover h-28 w-24 sm:h-32"src="https://firebasestorage.googleapis.com/v0/b/rw-bulid.appspot.com/o/data%2Fffe06137-87b0-43d1-870a-c222810031dc%2Fkarachi1.jpeg?alt=media&token=805b585b-d421-4ebf-9ac2-3907826caa66"/>
            <div className='ml-6'>
              <div className='font-medium'>{"Karachi fabric 3pc blue warm Suit".slice(0,25)}..</div>
              <div className=''>
                <div className='bg-slate-200 p-1 inline-block rounded-lg'>
                  <div className='inline-block font-medium'>Size:</div>
                  <select className='bg-slate-200'>
                    <option>36</option>
                    <option>38</option>
                    <option>40</option>
                    <option>42</option>
                  </select>
                </div>
                <div className='bg-slate-200 p-1 mt-2 ml-2 inline-block rounded-lg'>
                  <div className='inline-block font-medium'>Qty:</div>
                  <select className='bg-slate-200'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
              <div className='mt-2'>
                <div className='inline-block font-bold'>₹1000</div>
                <div className='inline-block line-through ml-2 text-slate-500'>₹{(1000*120)/100}</div>
                <div className='inline-block ml-2 text-red-500'>20% OFF</div>
              </div>
            </div>
          </div>
          <img className="h-[1.2rem]" src='https://img.icons8.com/puffy/32/ff0000/experimental-trash-puffy.png'/>
        </div>
        <div className='border'/>
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
          <div className='border my-2'/>
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