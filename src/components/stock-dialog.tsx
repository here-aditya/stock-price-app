import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchStockData, setIsDialogOpen, setStockName } from '../features/stock/stock-slice';
import { Typography } from '@mui/material';

const StockDialog: React.FC = () => {
    const isDialogOpen = useSelector((state: RootState) => state.stock.isDialogOpen);
    const dispatch = useDispatch<AppDispatch>();
    const stockName = useSelector((state: RootState) => state.stock.stockName);

    const updateStockName = (name: string) => {
        dispatch(setStockName(name));
    }
    const handleSubmit = () => {
        if (stockName) {
            dispatch(fetchStockData(stockName));
            dispatch(setIsDialogOpen(false))
        }
    };

    return (
        <div>
            <Modal
                open={isDialogOpen}
                onClose={() => dispatch(setIsDialogOpen(false))}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className="modal-box">
                    <Typography variant="h3">Select Stock :</Typography>
                    <Typography variant="h6">(i.e. GOOGL, AAPL, TSLA)</Typography>
                    <div>
                        <p>
                            <input
                                type="text"
                                value={stockName || ''}
                                onChange={(e) => updateStockName(e.target.value.toUpperCase())}
                                placeholder="Enter stock name"
                            />
                        </p>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default StockDialog;
