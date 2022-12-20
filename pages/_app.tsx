import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AuthProvider} from '../Authentication/AuthContext'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
