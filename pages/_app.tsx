import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useState } from 'react';
import Web3Modal from 'web3modal';
import { AccountContext } from '../context/auth-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState<string | null>(null);
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'b322a365347f4bf0b9ac671ce69fff24',
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
    } catch (err) {
      console.log('error:', err);
    }
  }

  return (
    <>
      <nav>
        <div>
          <Link href="/">
            <a>
              <div>
                <h2>Full Stack</h2>
                <p>WEB3</p>
              </div>
            </a>
          </Link>
          {!account && (
            <div className="">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={connect}>
                Connect
              </button>
            </div>
          )}
          {account && <p>{account}</p>}
        </div>
      </nav>
      <div className="container">
        <AccountContext.Provider value={account}>
          <Component {...pageProps} />
        </AccountContext.Provider>
      </div>
    </>
  );
}

export default MyApp;
