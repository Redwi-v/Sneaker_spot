import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '~shared/state/hooks/hooks';

interface ICartItem {}

interface ICart {
    cartItems: ICartItem[];
    allPrice: number;
}

const initialState: ICart = {
    cartItems: [],
    allPrice: 0,
};

const cartSlice = createSlice({
    initialState,
    name: 'Cart',
    reducers: {},
});

export const useCartSelector = () => useAppSelector((state) => state.cartReducer);

export default cartSlice.reducer;
