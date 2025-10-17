
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Nav from '@/components/Nav'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav />
      <main className="container pb-24">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
