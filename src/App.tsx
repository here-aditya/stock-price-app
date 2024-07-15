import React from 'react';
import StockTable from './components/stock-table';
import useStockData from './hooks/use-stock-data';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import StockDialog from './components/stock-dialog';
import { setIsDialogOpen } from './features/stock/stock-slice';
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useStockData();

  return (
    <div className="container">
      <div className="centered-content">
        <h1>Stock Price App</h1>
        <button onClick={() => dispatch(setIsDialogOpen(true))}>Select Stock</button>
        <StockDialog />
        <StockTable />
      </div>
    </div>
  );
};

export default App;