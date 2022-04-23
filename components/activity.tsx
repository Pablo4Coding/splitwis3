import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_EXPENSES_QUERY } from '../apollo/queries';

const Activity = () => {
  const { loading, error, data } = useQuery(ADD_EXPENSES_QUERY);
  const [expenses, setExpenses] = useState<any | null>(null);

  useEffect(() => {
    console.log('data.addExpenses', data?.addExpenses);
    if (data) {
      setExpenses([...data?.addExpenses]);
    }
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full h-min-52 bg-red">
      <div>hello</div>
      {expenses &&
        expenses.map((expense: any) => {
          const { id, from, amount, description } = expense;
          return (
            <div key={id}>
              <div>{id}</div>
              <div>{from}</div>
              <div>{amount}</div>
              <div>{description}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Activity;
