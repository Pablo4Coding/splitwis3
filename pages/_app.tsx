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
    <div className="h-screen bg-gradient-to-r from-tertiary to-other">
      <nav className="bg-other">
        <div className="flex items-center justify-between w-full px-2 py-4 border-b-1">
          <Link href="/">
            <a>
              <div className="flex flex-col pl-3">
                <h2 className="m-0 ml-3 font-medium">SplitConnect</h2>
              </div>
            </a>
          </Link>
          <Link href="/groups">
            <a>
              Groups
            </a>
          </Link>
          {!account && (
            <div className="">
              <button
                className="px-4 py-2 font-bold rounded bg-primary hover:bg-secondary"
                onClick={connect}>
                Connect your wallet
              </button>
            </div>
          )}
          {account && <p>{account}</p>}
        </div>
      </nav>
      <div className="container mx-auto">
        <AccountContext.Provider value={account}>
          <Component {...pageProps} />
        </AccountContext.Provider>
      </div>
    </div>
  );
}

export default MyApp;
