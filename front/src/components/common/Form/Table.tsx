import React from "react";

interface TableProps<T> {
  headers: string[];
  items: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
}

const Table = <T,>({ headers, items, renderRow }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto  h-[50vh]">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th key={index} className="p-2 text-left border-b border-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td colSpan={headers.length} className="p-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
