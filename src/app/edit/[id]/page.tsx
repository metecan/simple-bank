'use client';

import { useParams, useRouter } from 'next/navigation';

import type { FC } from 'react';
import React from 'react';
import { ITransaction } from 'src/app/types/response.types';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { useRequest } from 'src/hooks/useRequest.hook';

const EditPage: FC = () => {
  const router = useRouter();
  const param = useParams();
  const id = param.id as string;

  const transactionsReq = useRequest('http://localhost:3001/transactions/' + id, 'GET');

  const [transaction, setTransaction] = React.useState<ITransaction>();
  const [iban, setIban] = React.useState('');
  const [amount, setAmount] = React.useState('');

  React.useEffect(() => {
    if (!transaction) {
      transactionsReq().then(res => {
        setTransaction(res);
      });
    }
  }, []);

  const handleFormSubmit = () => {
    const req = useRequest('http://localhost:3001/transactions/' + id, 'PUT');
    req({
      id,
      currency: transaction?.currency,
      iban: iban !== '' ? iban : transaction?.iban,
      date: transaction?.date,
      status: 'Edited',
      amount: amount !== '' ? amount : transaction?.amount,
    });
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="flex justify-start">
        <Button label="Go Back" onClick={() => router.push('/')} />
      </span>

      <h2 className="text-xl font-bold">Edit Transaction</h2>
      <Input
        label="Enter an IBAN (34 Char)"
        placeholder="Enter an IBAN"
        onChange={setIban}
        length={34}
        defaultValue={transaction?.iban}
      />
      <Input
        label="Enter amount"
        placeholder="Enter amount"
        type="number"
        onChange={setAmount}
        defaultValue={transaction?.amount}
      />
      <div className="flex justify-end">
        <Button label="Submit" onClick={handleFormSubmit} color="primary" />
      </div>
    </div>
  );
};
export default EditPage;
