import type { NextPage } from 'next';
import abi from '../SplitConnect.json';
import { ethers } from 'ethers';
import { useState } from 'react';

const Home: NextPage = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const contractABI = abi.abi;
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const splitConnectContract = new ethers.Contract(
    '0xa0C4571826FdAcda99e18bC6d8f40731E1597325',
    contractABI,
    signer,
  );

  const addExpense = () => {
    splitConnectContract.addExpense(description, amount);
  };

  const onNewExpense = () => {
    alert('New Expense Added!');
  };

  splitConnectContract.on('AddExpense', onNewExpense);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        <div className="card border border-gray-100 bg-purple-100 transition-shadow shadow-xl hover:shadow-xl w-max-2xl">
          <img
            src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg"
            className="h-48 w-screen"
          />
          <div className="flex items-center p-4">
            <div className="relative flex flex-col items-center w-full">
              <div className="h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-600 min-w-max absolute -top-16 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
                <img
                  className="w-40 h-30 rounded-full"
                  src="https://miro.medium.com/max/3150/1*fHerDrCZy-D9W787CboY8Q.png"
                  alt="Neil image"
                />
                <div className="absolute"></div>
              </div>
              <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
                <span className="text-xl whitespace-nowrap text-gray-800 font-semibold">
                  ETH Amsterdam 2022
                </span>
                <div className="flex">
                  <button className="px-4 py-2 mr-4 font-bold rounded bg-secondary hover:bg-primary">
                    ADD USER
                  </button>
                  <button
                    onClick={() => setShowAddExpense(!showAddExpense)}
                    className="px-4 py-2 font-bold rounded bg-primary hover:bg-secondary">
                    ADD EXPENSES
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showAddExpense && (
            <div className="absolute top-0 left-0 bg-tertiary h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans">
              <div
                className="absolute top-0 right-0 p-4 font-bold text-white cursor-pointer"
                onClick={() => setShowAddExpense(!showAddExpense)}>
                X
              </div>
              <div className="h-screen w-full absolute flex items-center justify-center bg-modal">
                <div className="bg-secondary rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
                  <div>
                    <label className="text-white">Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-white">Amount</label>
                    <input type="text" onChange={(e) => setAmount(+e.target.value)} />
                  </div>
                  <button
                    onClick={() => addExpense()}
                    className="px-4 py-2 font-bold rounded bg-primary hover:bg-secondary">
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
