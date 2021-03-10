import { useState } from 'react'
import '../styles/globals.css'
import Navbar from '../components/Navbar.jsx'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Navbar setLoading={setLoading} />
      <Head>
        <meta
          name='description'
          content='Look up League of Legends summoners'
        />
        <meta
          name='keywords'
          content='league of legends, lol, summoner, stats, champions'
        />
      </Head>
      {/* <Navbar /> */}
      <Component {...pageProps} loading={loading} setLoading={setLoading} />
    </>
  )
}

export default MyApp
