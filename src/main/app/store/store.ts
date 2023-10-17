import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import cartReducer from '~entities/cart/model/cart.slice';
import { productListApi } from '~widgets/productsList';
import { filtersReducer } from '~entities/filters';

const reducers = combineReducers({
    cartReducer,
    filtersReducer,
    [productListApi.reducerPath]: productListApi.reducer,
});

export const store = configureStore({
    reducer: reducers,
    devTools: true,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productListApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
