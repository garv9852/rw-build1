import { motion, AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from 'next/app'
import { AuthProvider } from '../Authentication/AuthContext'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router=useRouter()
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1,
          },
          exitState: {
          },
        }}
        className="base-page-size"
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp
