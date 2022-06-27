import '../styles/globals.css'
import type { AppProps } from 'next/app'

// import i18n (needs to be bundled ;))
import '/i18n/i18n.ts';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
