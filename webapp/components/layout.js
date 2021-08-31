// Standard Next.js Import
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// Stylesheets
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'Nozomi'

const Layout = ({ children, home }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Nozomi Bot Webapp"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      
      <header className={styles.header}>
        {!home && (
          <Link href="/">
            <div className={styles.backToHome}>
              <span>BACK</span>
            </div>
          </Link>
        )}
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        {home && (
          <p>links here</p>
        )}
      </footer>
    </>
  )
}

export default Layout