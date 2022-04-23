import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ADD_EXPENSES_QUERY } from '../apollo/queries';
import { USERS as users } from '../constants';

interface Balance {
  user: string;
  amount: number;
}

const Balances = () => {
  // const [expenses, setExpenses] = useState<any | null>(null);
  const { loading, error, data } = useQuery(ADD_EXPENSES_QUERY);
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    console.log('data.addExpenses', data?.addExpenses);

    if (data) {
      const expenses = [...data?.addExpenses];
      console.log('🚀 ~ file: balances.tsx ~ line 17 ~ useEffect ~ expenses', expenses);
      // setExpenses([...data?.addExpenses]);
      console.log('hello');
      const amounts = [];
      for (const user of users) {
        const sum = expenses
          .filter((expense) => expense.from === user.address)
          .reduce((accumulator, object) => {
            return accumulator + +object.amount;
          }, 0);
        console.log('🚀 ~ file: balances.tsx ~ line 30 ~ useEffect ~ sum', sum);

        amounts.push(sum);

        // const sum = arr.reduce((accumulator, object) => {
        //   return accumulator + object.salary;
        // }, 0);
      }

      for (const amount of amounts) {
        console.log('🚀 ~ file: balances.tsx ~ line 41 ~ useEffect ~ amount', amount);
        const index = amounts.indexOf(amount);
        const auxAmounts = [...amounts];
        auxAmounts.splice(index, 1);

        const newBalance = auxAmounts.reduce((acc: any, obj: any) => acc + obj, 0);
        console.log('🚀 ~ file: balances.tsx ~ line 45 ~ useEffect ~ newBalance', newBalance);
        const final = amount - newBalance;
        console.log('🚀 ~ file: balances.tsx ~ line 48 ~ useEffect ~ final', final);
        setBalances((prev) => [...prev, { user: users[index].address, amount: final }]);
      }
    }
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>balances</div>
      <div className="flex-col">
        {balances.map((balance) => (
          <div
            className="flex items-center justify-between border-solid border-b-1"
            key={balance.user}>
            <img
              className="h-10 mr-4 rounded-full w-15"
              src="https://miro.medium.com/max/3150/1*fHerDrCZy-D9W787CboY8Q.png"
              alt="Neil image"
            />
            <div className="mr-4">{balance.user}</div>
            <div className="text-red">{balance.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balances;
