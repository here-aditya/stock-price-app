import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const StockTable: React.FC = () => {
  const stockData = useSelector((state: RootState) => state.stock.stockData);
  const apiStatus = useSelector((state: RootState) => state.stock.status);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const columnDefs = useMemo(() => [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Time', field: 'timeStamp', valueFormatter: (params: { value: number }) => formatDate(params.value) },
    { headerName: 'Price', field: 'price' }
  ], []);

  return (
    <>
      <p>{(apiStatus && apiStatus === 'loading') && <strong>Loading...</strong>}</p>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={stockData}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
};

export default StockTable;
