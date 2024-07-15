import { combineReducers, configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/stock/stock-slice'
import { loadState, saveState } from '../utils/local-storage';

const preloadedState = loadState();

const rootReducer = combineReducers({
  stock: stockReducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
