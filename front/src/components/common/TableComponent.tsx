import React from "react";

interface TableItem {
  id: number | string; 
}

interface TableProps<T extends TableItem> {
  headers: string[];
  items: {
    data: T[];
  };
  children: (item: T) => React.ReactNode;
}

const TableComponent = <T extends TableItem>({
  headers,
  items,
  children,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-gray-300 text-left text-sm font-semibold text-gray-600 p-3"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.data.map((item, index) => (
            <tr
              key={item.id}
              className={`hover:bg-gray-50 transition-colors ${
                index % 2 !== 0 ? "bg-gray-50" : "bg-white"
              } text-gray-700 text-sm`}
            >
              <td className="p-3" data-label="SN">
                {index + 1}
              </td>
              {children(item)} 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
