'use client';

import React from 'react';
import AmountCardGroup from 'src/components/AmountCardGroup';
import ButtonGroup from 'src/components/ButtonGroup';
import Table from 'src/components/Table/Table';
import { useRequest } from 'src/hooks/useRequest.hook';
import { IBalance, ITransaction } from './types/response.types';
import NewTransactionModal from 'src/components/NewTransactionModal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [transactions, setTransactions] = React.useState<ITransaction[]>([]);
  const [balances, setBalances] = React.useState<IBalance[]>([]);

  const transactionsReq = useRequest('http://localhost:3001/transactions', 'GET');
  const balancesReq = useRequest('http://localhost:3001/balances', 'GET');

  React.useEffect(() => {
    if (!transactions || transactions.length === 0) {
      transactionsReq().then(res => {
        setTransactions(res);
      });
    }
  }, []);

  React.useEffect(() => {
    if (!balances || balances.length === 0) {
      balancesReq().then(res => {
        setBalances(res);
      });
    }
  }, []);

  const bodyRows = transactions.map(transaction => {
    return [
      transaction.id,
      transaction.currency,
      transaction.iban,
      transaction.date,
      transaction.status,
      transaction.amount,
    ];
  });

  const refetchTransactions = () => {
    transactionsReq().then(res => {
      setTransactions(res);
    });
  };

  const refetchBalances = () => {
    balancesReq().then(res => {
      setBalances(res);
    });
  };

  const handleDelete = (id: string) => {
    const req = useRequest(`http://localhost:3001/transactions/${id}`, 'DELETE');
    req().then(res => {
      const newTransactions = transactions.filter(transaction => transaction.id.toString() !== id);
      setTransactions(newTransactions);
    });
  };

  return (
    <div>
      <AmountCardGroup balances={balances} />
      <ButtonGroup
        actions={[
          {
            label: 'New Transaction',
            onClick: () => {
              setIsOpen(true);
            },
          },
          {
            label: 'View Report',
            onClick: () => {
              router.push('/reports');
            },
          },
        ]}
      />
      <Table
        headCols={['ID', 'Currency', 'IBAN', 'Date', 'Status', 'Amount', '']}
        bodyRows={[...bodyRows] as string[][]}
        deleteAction={handleDelete}
      />
      <NewTransactionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetchTransactions={refetchTransactions}
        refetchBalances={refetchBalances}
      />
    </div>
  );
}
