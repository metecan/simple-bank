import type { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: 'primary' | 'success' | 'danger' | 'white';
  disable?: boolean;
}

const Button: FC<ButtonProps> = ({ label, onClick, color = 'white', disable }) => {
  const handleColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-blue-50 hover:bg-blue-100 text-blue-500 ring-blue-300';
      case 'success':
        return 'bg-green-50 hover:bg-green-100 text-green-500 ring-green-300';
      case 'danger':
        return 'bg-red-50 hover:bg-red-100 text-red-500 ring-red-300';
      case 'white':
        return 'bg-white hover:bg-gray-50 text-gray-700 ring-gray-300';
      default:
        return 'bg-white hover:bg-gray-50 text-gray-700 ring-gray-300';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto sm:px-6 ${handleColor()} ${
        disable ? 'cursor-not-allowed opacity-60' : ''
      }`}
    >
      {label}
    </button>
  );
};
export default Button;
