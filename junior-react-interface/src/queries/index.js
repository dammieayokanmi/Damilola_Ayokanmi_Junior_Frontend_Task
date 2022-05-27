import { gql } from '@apollo/client'
import { queries } from '@testing-library/react';

export const getCurrencies =()=>{
    const CURRENCIES_QUERY = gql`
    query getCurrencies {
      {
          currencies {
            label
            symbol
          }
        }
    }
    .then((res) => resolve(res.data.currencies))
              .catch((err) => reject(err));
  `;
}


export default queries;