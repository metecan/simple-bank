import type { FC } from 'react';

type ColorType = 'blue' | 'orange' | 'red' | 'indigo';

interface CardProps {
  icon: string | JSX.Element;
  amount: number;
  description: string;
  color: ColorType;
}

const AmountCard: FC<CardProps> = ({ icon, amount, description, color }) => {
  const convertColor = (color: ColorType) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-400 border-blue-100';
      case 'orange':
        return 'bg-orange-50 text-orange-400 border-orange-100';
      case 'red':
        return 'bg-red-50 text-red-400 border-red-100';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-400 border-indigo-100';
      default:
        return 'bg-blue-50 text-blue-400 border-blue-100';
    }
  };

  return (
    <div className="flex items-start rounded-xl bg-white p-4 border">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full borde text-xl ${convertColor(color)}`}>
        {icon}
      </div>

      <div className="ml-4">
        <h2 className="font-semibold">
          {icon}
          {amount}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};
export default AmountCard;
