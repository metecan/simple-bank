import React from 'react';
import type { FC } from 'react';
import SVGTrash from '../Icons/SVGTrash';
import SVGEdit from '../Icons/SVGEdit';
import { useRouter } from 'next/navigation';

interface TableProps {
  headCols: string[];
  bodyRows: string[][];
  deleteAction: (id: string) => void;
}

const Table: FC<TableProps> = ({ headCols, bodyRows, deleteAction }) => {
  const router = useRouter();

  return (
    <table className="w-full bg-white text-left text-sm text-gray-500">
      <thead className="bg-gray-50 border rounded-xl">
        <tr className="rounded-xl">
          {headCols.map(col => (
            <th key={col} scope="col" className="px-6 py-4 font-medium text-gray-900">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {bodyRows.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {row.map(col => (
              <td key={col} className="px-6 py-4">
                {col}
              </td>
            ))}
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                <button onClick={() => deleteAction(row[0])} x-data="{ tooltip: 'Delete' }" className="cursor-pointer">
                  <SVGTrash />
                </button>
                <button
                  onClick={() => router.push('edit/' + row[0])}
                  x-data="{ tooltip: 'Delete' }"
                  className="cursor-pointer"
                >
                  <SVGEdit />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
