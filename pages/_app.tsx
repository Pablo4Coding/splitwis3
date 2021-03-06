import { ApolloProvider } from '@apollo/client';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Web3Modal from 'web3modal';
import client from '../apollo/client';
import { AccountContext } from '../context/auth-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState<string | null>(null);
  const router = useRouter();

  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      network: 'mumbai',
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: { 80001: 'https://matic-mumbai.chainstacklabs.com' },
          },
        },
      },
    });
    return web3Modal;
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
      router.push('/groups');
    } catch (err) {
      console.log('error:', err);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-secondary to-secondary">
      <nav className="border-b-2 border-white bg-secondary">
        <div className="flex items-center justify-between w-full px-2 py-4 border-b-1">
          {account && (
            <>
              <Link href="/">
                <a>
                  <div className="flex flex-col pl-3">
                    <h2 className="m-0 ml-3 font-medium text-primary">SplitConnect</h2>
                  </div>
                </a>
              </Link>
              <Link href="/groups">
                <a>Groups</a>
              </Link>
              <Link href="/activity">
                <a>Activity</a>
              </Link>
            </>
          )}

          {!account && (
            <div className="w-full text-right">
              <button
                className="px-4 py-2 font-bold text-white rounded bg-tertiary hover:bg-secondary"
                onClick={connect}>
                Connect your wallet
              </button>
            </div>
          )}
          {account && <p>{account}</p>}
        </div>
      </nav>
      <div className="container max-h-full mx-auto">
        <AccountContext.Provider value={account}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AccountContext.Provider>
      </div>
    </div>
  );
}

export default MyApp;
