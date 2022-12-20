import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/home/Header'
import ProductGrid from '../components/home/ProductGrid'
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Online Shopping Site in India</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <ProductGrid/>
    </div>
  )
}

export default Home
