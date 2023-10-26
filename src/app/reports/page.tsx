'use client';

import type { FC } from 'react';
import React from 'react';
import Chart from 'react-apexcharts';
import { ITransaction } from '../types/response.types';
import { useRequest } from 'src/hooks/useRequest.hook';
import Button from 'src/components/Button';
import { useRouter } from 'next/navigation';

const ReportsPage: FC = () => {
  const router = useRouter();

  const transactionsReq = useRequest('http://localhost:3001/transactions/', 'GET');
  const [transactions, setTransactions] = React.useState<ITransaction[]>();

  React.useEffect(() => {
    if (!transactions) {
      transactionsReq().then(res => {
        setTransactions(res);
      });
    }
  }, []);

  const uniqueCurrencies = transactions
    ?.map(transaction => transaction.currency)
    .filter((value, index, self) => self.indexOf(value) === index);

  const data = transactions?.map(transaction => {
    return {
      currency: transaction.currency,
      amount: transaction.amount,
    };
  });

  const currencySums: { [currency: string]: number } = {};

  if (data) {
    for (const item of data) {
      const { currency, amount } = item;
      if (currency in currencySums) {
        currencySums[currency] += amount;
      } else {
        currencySums[currency] = amount;
      }
    }
  }

  const currencySumsArray = Object.values(currencySums);

  const options = {
    chart: {
      id: 'apexchart-example',
    },
    xaxis: {
      categories: uniqueCurrencies,
    },
  };

  const series = [
    {
      name: 'Total Amounts',
      data: currencySumsArray,
    },
  ];

  return (
    <div>
      <span className="flex justify-start mb-4">
        <Button label="Go Back" onClick={() => router.push('/')} />
      </span>
      <h2 className="text-xl font-bold">Transactions Reports</h2>
      <span className="flex justify-start">Total Amounts for Currencies</span>
      <div className="mt-4">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};
export default ReportsPage;
