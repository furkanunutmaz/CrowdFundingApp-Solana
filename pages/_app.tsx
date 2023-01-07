/*
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import WalletContextProvider from '../components/WalletContextProvider'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

*/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }) {

    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

      // You can also provide a custom RPC endpoint.
  const endpoint = clusterApiUrl(network);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <Head>
              <title>Donation Portal</title>
            </Head>
            <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp