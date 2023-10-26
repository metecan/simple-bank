import type { FC } from 'react';

interface OptionGroupProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const OptionGroup: FC<OptionGroupProps> = ({ options, selectedOption, setSelectedOption }) => {
  const handleSelectedOptionColor = (option: string) => {
    if (option === selectedOption) {
      return 'bg-stone-950 text-white border-stone-950';
    } else {
      return 'bg-white text-gray-900 border-gray-200 hover:border-gray-300';
    }
  };

  return (
    <fieldset className="flex flex-wrap justify-between gap-3">
      {options.map((option, index) => (
        <label
          key={index}
          onClick={() => setSelectedOption(option)}
          className={`flex cursor-pointer items-center justify-center rounded-md border border-gray-200  px-8 py-2  hover:border-gray-300 ${handleSelectedOptionColor(
            option,
          )}`}
        >
          <p className="text-sm font-medium">{option}</p>
        </label>
      ))}
    </fieldset>
  );
};
export default OptionGroup;
