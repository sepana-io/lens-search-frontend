import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'

function MyApp({ Component, pageProps }: AppProps) {

  return <div style={{ maxWidth: 1200 }}>
    <Header />
    <Component {...pageProps} />
  </div>
}

export default MyApp
