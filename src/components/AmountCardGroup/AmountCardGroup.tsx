import type { FC } from 'react';
import { IBalance } from 'src/app/types/response.types';
import AmountCard from 'src/components/AmountCard';

interface AmountCardGroupProps {
  balances: IBalance[];
}

const AmountCardGroup: FC<AmountCardGroupProps> = ({ balances }) => {
  console.log(balances);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {balances.map((balance, index) => (
        <AmountCard
          key={balance.id}
          icon={balance.symbol}
          amount={balance.amount}
          description={`Your ${balance.currency} Balance`}
          color={index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'orange' : index % 4 === 2 ? 'red' : 'indigo'}
        />
      ))}
    </div>
  );
};
export default AmountCardGroup;
