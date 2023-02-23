import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Product from '../components/Products'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [products,setProducts] =useState([])
  const [loading,setLoading] =useState(false)
  const [error,setError] =useState(false)

  useEffect(()=>{

fetchProducts()
  },[])

async function fetchProducts(){
  try {
    setLoading(true)
    setError(false)

    const res = await fetch('/api/products')
    const newProducts = await res.json()
    setProducts(newProducts)
  } catch (error) {
    setError(true)
  }
  setLoading(false)
}

if (error) {

  return <div>Faild to load</div>
  
}

if (loading) {

  return <div>loading.....</div>
  
}


  return (
    <>
   
      <main className={styles.main}>
        <Product data={products}/>
      </main>
     
    </>
  )
}
