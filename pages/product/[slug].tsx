import React, { useContext, useEffect, useState } from 'react'
import absoluteUrl from "next-absolute-url"
import Head from 'next/head'
import Header from '../../components/home/Header'
import AuthContext from '../../Authentication/AuthContext'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
interface props {
    product: {
        id?: string,
        image: string,
        title: string,
        description: string,
        fabric: string,
        price: number,
        size: { label: string, pieces: string }[]
    }
}
function product({ product }: props) {
    const [dialogBox, setDialogBox] = useState(false);
    const [removeDialogBox, setRemoveDialogBox] = useState(true)
    const [size, setSize] = useState(product.size[0].label);
    const [itemInCart, setItemInCart] = useState(0)
    const { cart, setCart } = useContext(AuthContext);
    useEffect(() => {
        setItemInCart(getCartNumber());
    }, [cart])
    const handleBuy = () => {
        if (!dialogBox) {
            setDialogBox(true);
            return;
        }
        setDialogBox(false);
    }
    const handleAddToCart = () => {
        if (!dialogBox) {
            setDialogBox(true);
            return;
        }
        setCart([...cart, { id: product.id, size: size }]);
        setDialogBox(false);
    }
    const handleRemovefromCart = () => {
        if (!removeDialogBox) {
            setRemoveDialogBox(true);
            return;
        }
    }
    const getCartNumber = () => {
        let x = cart.filter((e: any) => {
            return e.id == product.id
        })
        return x.length;
    }
    return (
        <>
            <Head>
                <title>{product.description}</title>
            </Head>
            <Header />
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-20 mx-auto">
                    <div className="lg:w-5/6 mx-auto flex flex-wrap justify-center">
                        <img className="h-[35rem] w-[25rem] object-cover border rounded-xl" src={product.image} alt={product.title + "-image"} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex py-2 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">{product.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            {
                                                product.size.map((e) => (
                                                    <option value={e.label} key={e.label}>{e.label}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">₹ {product.price}.00</span>
                                <button onClick={handleBuy} className=" flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
                                {
                                    itemInCart == 0 ?
                                        (<button onClick={handleAddToCart} className=" flex ml-4 text-black outline outline-1 outline-red-500 py-2 px-6 hover:outline-2 rounded">Add To Cart</button>)
                                        :
                                        (<div className='ml-4 inline-block'>
                                            <button onClick={handleAddToCart} className='p-2 border  rounded-lg border-red-500 focus:shadow'>+</button>
                                            <div className='inline-block px-6'>{itemInCart}</div>
                                            <button onClick={handleRemovefromCart} className='p-2 border rounded-lg border-red-500 focus:shadow-2xl'>-</button>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={`${!dialogBox && "hidden"} transition duration-300 ease-ini-out fixed  top-0 items-center h-screen overflow-hidden w-screen flex justify-center bg-slate-200/50`}>
                <div className="transtion bg-white rounded-2xl hover:shadow-lg duration-300 p-6 max-w-sm">
                    <h1 className='text-xl font-semibold'>Select the Size</h1>
                    <div className="relative flex justify-center my-4">
                        <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                            {
                                product.size.map((e) => (
                                    <option value={e.label} key={e.label}>{e.label}</option>
                                ))
                            }
                        </select>
                        <span className="absolute right-[6rem] top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="flex">
                        <button onClick={handleBuy} className="flex min-w-[7rem] min-h-[2.5rem] ml-auto text-white bg-red-500 border-0 py-2 px-6 hover:bg-red-600 rounded">Buy Now</button>
                        <button onClick={handleAddToCart} className="flex min-w-[9rem] min-h-[2.5rem] ml-4 text-black outline outline-1 outline-red-500 py-2 px-6 hover:outline-2 rounded">Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default product

export async function getServerSideProps({ params, req }: any) {
    const { origin } = absoluteUrl(req);
    const product = await fetch(`${origin}/api/getProductById`, {
        method: "post",
        body: JSON.stringify({
            id: params.slug
        })
    })
    return {
        props: await product.json()
    }
}