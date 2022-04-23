import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ADD_EXPENSES_QUERY } from '../apollo/queries';
import { USERS as users } from '../constants';

interface Balance {
  address: string;
  userName: string;
  amount: number;
}

const Balances = ({ settleUp, me }: { settleUp: (amount: number) => {}; me: string | null }) => {
  // const [expenses, setExpenses] = useState<any | null>(null);
  const { loading, error, data } = useQuery(ADD_EXPENSES_QUERY);
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    if (data) {
      setBalances([]);
      const expenses = [...data?.addExpenses];
      const amounts = [];
      for (const user of users) {
        const sum = expenses
          .filter((expense) => expense.from === user.address)
          .reduce((accumulator, object) => accumulator + +object.amount, 0);
        amounts.push(sum);
      }

      for (const amount of amounts) {
        const index = amounts.indexOf(amount);
        const auxAmounts = [...amounts];
        auxAmounts.splice(index, 1);
        const newBalance = auxAmounts.reduce((acc: any, obj: any) => acc + obj, 0);
        const final = amount - newBalance;
        setBalances((prev) => [
          ...prev,
          { address: users[index].address, amount: final, userName: users[index].name },
        ]);
      }
    }
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ padding: '1rem 3rem' }}>
      <h2 className="text-lg font-bold">BALANCES</h2>
      <div className="flex-col">
        {balances.map((balance) => (
          <div
            className={
              (me?.toLowerCase() === balance.address.toLowerCase()
                ? 'bg-secondary/50 '
                : ' ') +
              'flex items-center justify-between border-b-1 p-3 border-b-2 border-secondary'
            }
            key={balance.address}>
            <div className="basis-1/12 text-center">
              <img
                className="h-10 mr-4 rounded-full w-15"
                src="https://img.icons8.com/cotton/2x/000000/gender-neutral-user.png"
                alt="Neil image"
              />
            </div>
            <div className="mr-4 text-center basis-8/12 flex-col items-center">
              <div className="font-bold mr-2">{balance.userName}</div>
              <div>{balance.address}</div>
            </div>
            <div className="basis-3/12 text-center">
              {balance.amount === 0 && (
                <span className="text-white font-bold font-lg">{balance.amount}</span>
              )}
              {balance.amount > 0 && (
                <span className="text-green font-bold font-lg">To get paid {balance.amount}</span>
              )}
              {balance.amount < 0 && (
                <div>
                  <div className="text-red font-bold font-lg mb-2">To pay {balance.amount}</div>
                  <button
                    onClick={() => settleUp(Math.abs(balance.amount))}
                    className="px-1 py-1 font-bold rounded bg-red text-white">
                    Settle up
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balances;
