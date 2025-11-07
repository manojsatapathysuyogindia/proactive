import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const CommonTable: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="table-responsive table-product">
      <table className="table all-package theme-table" id="table_id">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;