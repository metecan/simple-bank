import type { FC } from 'react';

type InputType = 'text' | 'email' | 'password' | 'number';

interface InputProps {
  label: string;
  type?: InputType;
  placeholder?: string;
  onChange: (value: string) => void;
  length?: number;
  defaultValue?: string | number;
}

const Input: FC<InputProps> = ({ label, type = 'text', placeholder, onChange, length, defaultValue }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="ml-2 block text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        required
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 p-2 pe-12 text-sm"
        maxLength={length}
        minLength={length}
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default Input;
