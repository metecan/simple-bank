import type { FC } from 'react';
import Modal from 'src/components/Modal';
import Input from 'src/components/Input';
import React from 'react';
import OptionGroup from '../OptionGroup/OptionGroup';
import { useRequest } from 'src/hooks/useRequest.hook';
import { useNewId } from 'src/hooks/useNewId.hook';
import { IBalance } from 'src/app/types/response.types';

interface NewTransactionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchTransactions: () => void;
  refetchBalances: () => void;
}

const NewTransactionModal: FC<NewTransactionModalProps> = ({
  isOpen,
  setIsOpen,
  refetchTransactions,
  refetchBalances,
}) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState('TRY');
  const [iban, setIban] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleFormSubmit = () => {
    const req = useRequest('http://localhost:3001/transactions', 'POST');
    req({
      id: useNewId(),
      currency: selectedCurrency,
      iban,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      amount: Number(amount),
    }).then(() => {
      refetchTransactions();
    });

    const balanceReq = useRequest('http://localhost:3001/balances', 'GET');
    balanceReq().then(res => {
      const balance = res.find((balance: IBalance) => balance.currency === selectedCurrency);
      const balanceReq = useRequest(`http://localhost:3001/balances/${balance?.id}`, 'PUT');
      balanceReq({
        id: balance?.id,
        currency: balance?.currency,
        symbol: balance?.symbol,
        amount: balance?.amount - Number(amount),
      }).then(() => {
        refetchBalances();
      });
    });
  };

  return (
    <Modal
      title="New Transaction"
      hasFooter
      type="submit"
      isOpen={isOpen}
      setClose={() => {
        setIsOpen(false);
      }}
      onSubmit={() => {
        handleFormSubmit();
        setIsOpen(false);
      }}
      isFilled={iban.length === 34 && amount.length > 0}
    >
      <div className="flex flex-col gap-4 w-full">
        <Input label="Enter an IBAN (34 Char)" placeholder="Enter an IBAN" onChange={setIban} length={34} />
        <Input label="Enter amount" placeholder="Enter amount" type="number" onChange={setAmount} />
        <label className="ml-2 block text-sm font-medium text-gray-700">Choose Currency</label>
        <OptionGroup
          options={['TRY', 'USD', 'EUR', 'GEL']}
          selectedOption={selectedCurrency}
          setSelectedOption={setSelectedCurrency}
        />
      </div>
    </Modal>
  );
};
export default NewTransactionModal;
