import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ADD_EXPENSES_QUERY } from '../apollo/queries';

interface Expense {
  id: string;
  from: string;
  description: string;
  amount: string;
}

interface ActivityItemProps {
  expense: Expense;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ expense }) => {
  const { id, from, amount, description } = expense;

  return (
    <div className="p-5 mb-2 border-2 rounded border-secondary">
      <div className="text-l">
        <span className="font-bold">Description:</span> {description}
      </div>
      <div>
        <span className="font-bold">From:</span> {from}
      </div>
      <div className="mb-1">
        <span className="font-bold">Amount:</span> {amount} MATIC{' '}
        <span>
          <Image src="/matic.png" alt="matic icon" height={15} width={15} />
        </span>
      </div>
      <div className="text-xs text-grey">Transaction ID: {id}</div>
    </div>
  );
};

const Activity: NextPage = () => {
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
    <div className="w-full p-5 mx-auto bg-white m-7 h-min-52">
      <div className="my-5 text-2xl font-extrabold text-center text-secondary">Activity Log</div>
      {expenses &&
        expenses.map((expense: any) => {
          const { id } = expense;
          return <ActivityItem key={id} expense={expense} />;
        })}
    </div>
  );
};

export default Activity;
