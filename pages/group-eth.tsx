import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Balances from '../components/balances';
import ExpenseForm from '../components/expense-form';
import Loading from '../components/loading';
import { USERS as users } from '../constants';
import useHasMounted from '../hooks/useHasMounted';
import abi from '../SplitConnect.json';

const Home: NextPage = () => {
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  const hasMounted = useHasMounted();

  const contractABI = abi.abi;
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const splitConnectContract = new ethers.Contract(
    '0xa0C4571826FdAcda99e18bC6d8f40731E1597325',
    contractABI,
    signer,
  );

  useEffect(() => {
    ethereum.request({ method: 'eth_accounts' }).then((accounts: any) => {
      if (accounts.length) {
        setAccount(accounts[0]);
      }
    });
  }, []);

  if (!hasMounted) {
    return null;
  }

  const addExpense = () => {
    setLoading(true);
    splitConnectContract.addExpense(description, amount);
  };

  const onNewExpense = () => {
    setLoading(false);
    setShowAddExpense(false);
  };

  const transfer = async (amount: number) => {
    if (account) {
      await signer
        .sendTransaction({
          from: account,
          to: users.find((user) => user.address !== account)?.address,
          value: ethers.utils.parseEther(amount.toString()),
        })
        .catch(() => alert('Error. You probably dont have enough funds'));
    } else {
      const accounts: string[] = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setAccount(accounts[0]);
      }
    }
  };

  splitConnectContract.on('AddExpense', onNewExpense);

  return (
    <div>
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="transition-shadow bg-purple-100 border border-gray-100 shadow-xl card hover:shadow-xl w-max-2xl">
          <img
            src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg"
            className="w-screen h-48"
          />
          <div className="flex items-center p-4">
            <div className="relative flex flex-col items-center w-full">
              <div className="absolute relative flex items-end justify-end w-24 h-24 row-start-1 row-end-3 text-purple-100 text-purple-600 bg-purple-200 rounded-full md avatar min-w-max -top-16 text-purple-650 ring-1 ring-white">
                <img
                  className="w-40 rounded-full h-30"
                  src="https://miro.medium.com/max/3150/1*fHerDrCZy-D9W787CboY8Q.png"
                  alt="Neil image"
                />
                <div className="absolute"></div>
              </div>
              <div className="flex flex-col items-center justify-center w-full -mt-12 space-y-1">
                <h1 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                  ETH Amsterdam 2022
                </h1>
                <div className="flex">
                  {/* <button className="px-4 py-2 mr-4 font-bold rounded bg-secondary hover:bg-primary">
                    ADD USER
                  </button> */}
                  <button
                    onClick={() => setShowAddExpense(!showAddExpense)}
                    className="px-4 py-2 font-bold rounded bg-primary hover:bg-secondary">
                    ADD EXPENSES
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showAddExpense && !loading && (
            <ExpenseForm
              changeAmount={setAmount}
              changeDescription={setDescription}
              changeShow={() => setShowAddExpense(!showAddExpense)}
              save={addExpense}
            />
          )}
          {loading && <Loading />}
          <Balances settleUp={transfer} me={account} />
        </div>
      </div>
    </div>
  );
};

export default Home;
