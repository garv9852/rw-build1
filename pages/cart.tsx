import Head from 'next/head'
import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../Authentication/AuthContext'
import Header from '../components/home/Header'
import Loading from '../components/elements/Loading'
interface pro {
  product: {
    id?: string,
    image: string,
    title: string,
    description: string,
    fabric: string,
    price: any,
    size: Object[]
  },
  id: String,
  size: String,
  qty: String,
  price: any
}
function cart() {
  const { cart, setCart } = useContext(AuthContext);
  const [showCart, setShowCart] = useState<pro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalBill, setTotalbill] = useState();
  useEffect(() => {
    const get = () => {
      let tempCart: pro[] = [];
      cart.map(async (e: any) => {
        setLoading(true);
        const resX = await fetch("/api/getProductById", {
          method: 'post',
          body: JSON.stringify({ id: e.id })
        })
        tempCart = [{ ...await resX.json(), ...e }, ...tempCart];
        setShowCart([...tempCart]);
        setLoading(false);
      })
    }
    get();
  }, [])
  const getQtyCount = (e: any) => {
    let x = [];
    let z = e.product.size.findIndex((x: { label: String, pieces: string }) => x.label == e.size);
    for (let i = 1; i <= e.product.size[z].pieces; i++) {
      x.push(i);
    }
    return x;
  }
  const handeQtyChange = (val: any, item: any) => {
    const x = showCart.findIndex((e: any) => e.id == item.id && e.size == item.size);
    showCart[x].qty = val;
    showCart[x].price = showCart[x].product.price * val;
    setCart([...showCart]);
    setShowCart([...showCart]);
  }
  const handleSizeChange = (size: string, item: { id: string, size: string, qty: string }) => {
    const x = showCart.findIndex((e: any) => e.id == item.id && e.size == size);
    console.log(showCart);
    const y = showCart.findIndex((e: any) => e.id == item.id && e.size != size);
    let tempCart: any = showCart;
    tempCart[y].size = size;
    if (x != -1)
      tempCart = showCart.filter((_e: any, i: any) => i != x);
    setShowCart([...tempCart])
    setCart([...tempCart]);
  }
  const handleRemoveFromCart = (id: string, size: string) => {
    let tempCart = showCart.filter((e: any) => !(e.id == id && e.size == size))
    setShowCart([...tempCart]);
    setCart([...tempCart]);
  }
  const getCartCount = () => {
    let x = 0;
    cart.map((e: any) => {
      x += parseInt(e.qty);
    })
    return x;
  }
  const getBill = () => {
    let x = 0;
    cart.map((e: any) => {
      x += e.price;
    })
    return x;
  }
  return (
    <div>
      <Head>
        <title>
          Your Cart
        </title>
      </Head>
      <Header />
      <div className='max-w-3xl mx-auto text-xs sm:text-base p-2 space-y-2'>
        {
          showCart.map((e: any, i) => (
            <div key={e.id + "-" + i} className='border rounded-lg p-4 flex justify-between'>
              <div className='flex'>
                <img className="rounded-lg object-cover h-28 w-24 sm:h-32" src={e.product.image} />
                <div className='ml-6'>
                  <div className='font-medium'>{e.product.title.slice(0, 25)}..</div>
                  <div className=''>
                    <div className='bg-slate-200 p-1 inline-block rounded-lg'>
                      <div className='inline-block font-medium'>Size:</div>
                      <select value={e.size} onChange={(z) => handleSizeChange(z.target.value, e)} className='bg-slate-200'>
                        {
                          e.product.size.map((z: { label: string, pieces: string }) => (
                            <option key={z.label} value={z.label}>{z.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='bg-slate-200 p-1 mt-2 ml-2 inline-block rounded-lg'>
                      <div className='inline-block font-medium'>Qty:</div>
                      <select value={e.qty} onChange={(z) => handeQtyChange(z.target.value, e)} className='bg-slate-200'>
                        {
                          [...getQtyCount(e)].map((z) => (
                            <option key={z} value={z}>{z}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='inline-block font-bold'>{e.price}</div>
                    <div className='inline-block line-through ml-2 text-slate-500'>₹{(e.price * 120) / 100}</div>
                    <div className='inline-block ml-2 text-red-500'>20% OFF</div>
                  </div>
                </div>
              </div>
              <img onClick={() => handleRemoveFromCart(e.id, e.size)} className="h-[1.2rem]" src='https://img.icons8.com/puffy/32/ff0000/experimental-trash-puffy.png' />
            </div>
          ))
        }
        {
          getCartCount()>0 ?
            <div>
              <div className='border rounded-lg p-3 text-sm sm:text-base'>
                <div className='font-semibold'>Product Details({getCartCount()})</div>
                <div className='flex justify-between'>
                  <div>Total MRP</div>
                  <div>₹{(getBill() * 120) / 100}</div>
                </div>
                <div className='flex justify-between'>
                  <div>Discount MRP</div>
                  <div className='text-green-500'>-₹{(getBill() * 20) / 100}</div>
                </div>
                <div className='flex justify-between'>
                  <div>Delivery Charges</div>
                  <div>₹70</div>
                </div>
                <div className='border my-2' />
                <div className='flex justify-between font-bold'>
                  <div>Total Amount</div>
                  <div>₹{getBill() + 70}</div>
                </div>
              </div>
            </div>
            :
            <div className='text-center text-xl font-bold'>Cart is empty</div>
        }
      </div>
      <Loading visible={loading} />
    </div>
  )
}

export default cart