import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Product from '../components/Products'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
   
      <main className={styles.main}>
        <Product/>
      </main>
     
    </>
  )
}
