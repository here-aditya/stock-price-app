import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface StockState {
  stockName: string | null;
  stockData: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isDialogOpen: boolean
}

const initialState: StockState = {
  stockName: null,
  stockData: [],
  status: 'idle',
  isDialogOpen: false
};

// async thunk to fetch stock data
export const fetchStockData = createAsyncThunk(
  'stock/fetchStockData',
  async (stockName: string) => {
    const api_url = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${api_url}/api/stock/${stockName}`);
    return response.data;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockName(state, action: PayloadAction<string>) {
      state.stockName = action.payload;
    },
    setIsDialogOpen(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stockData = action.payload;
      })
      .addCase(fetchStockData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setStockName, setIsDialogOpen } = stockSlice.actions;

export default stockSlice.reducer;
