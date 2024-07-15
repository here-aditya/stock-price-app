import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchStockData } from '../features/stock/stock-slice';

const useStockData = () => {
  const dispatch: AppDispatch = useDispatch();
  const stockName = useSelector((state: RootState) => state.stock.stockName);

  useEffect(() => {
    if (stockName) {
      const interval: number = Number(process.env.REACT_APP_API_CALLING_INTERVAL);
      const intervalId = setInterval(() => {
        dispatch(fetchStockData(stockName));
      }, interval);

      return () => clearInterval(intervalId);
    }
  }, [stockName, dispatch]);
};

export default useStockData;
