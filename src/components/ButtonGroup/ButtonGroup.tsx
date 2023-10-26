import type { FC } from 'react';
import Button from 'src/components/Button';

type Action = {
  label: string;
  onClick: () => void;
};

interface ButtonGroupProps {
  actions: Action[];
}

const ButtonGroup: FC<ButtonGroupProps> = ({ actions }) => {
  return (
    <div className="inline-flex gap-2 mb-4 overflow-hidden rounded-md">
      {actions.map((action, index) => (
        <Button key={index} onClick={action.onClick} label={action.label} />
      ))}
    </div>
  );
};
export default ButtonGroup;
