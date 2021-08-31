// Standard Next.js Import
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// Stylesheets
import utilStyles from '../styles/utils.module.css'

// Components
import Layout, { siteTitle } from '../components/layout'

const Home = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.end}`}>
        <h2>About</h2>
      </section>
    </Layout>
  )
}

export default Home