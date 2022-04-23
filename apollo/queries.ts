import { gql } from '@apollo/client';

export const ADD_EXPENSES_QUERY = gql`
  query AddExpenses {
    addExpenses {
      id
      from
      amount
      description
    }
  }
`;
