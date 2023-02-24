import { ChakraProvider } from '@chakra-ui/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import { CartProvider } from '../context/CartContext'
import { wrapper } from '../redux/store'
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  const { store, props } = wrapper.useWrappedStore(pageProps);

  return <ChakraProvider>
    <SessionProvider session={session}>
      <PayPalScriptProvider deferLoading={true}>
      <CartProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </CartProvider>
      </PayPalScriptProvider>
    </SessionProvider>
  </ChakraProvider>
}
