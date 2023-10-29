import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFiltrationParams, SortingParams } from '~shared/api';
import { useAppSelector } from '~shared/state/hooks/hooks';

interface IObjectKeys {
    [key: string]: any;
}

interface IFiltersSlice extends IObjectKeys {
    term: string | null;
    sizes: number[] | null | string[];
    colors: string[] | null;
    brands: string[] | null | number[];
    price: number[] | null;

    sorting: SortingParams | null;
}

const initialState: IFiltersSlice = {
    term: null,
    sizes: null,
    colors: null,
    brands: null,
    price: null,
    sorting: null,
};

const filterSlice = createSlice({
    initialState,
    name: 'filters',

    reducers: {
        setTerm: (state, action: PayloadAction<string>) => {
            state.term = action.payload;
        },

        changePrice: (state, action: PayloadAction<number[]>) => {
            state.price = action.payload;
        },

        changeColors: (state, action: PayloadAction<string[]>) => {
            state.colors = action.payload;
        },

        changeSorting: (state, action: PayloadAction<SortingParams>) => {
            state.sorting = action.payload;
        },

        changeSizes: (state, action: PayloadAction<number[] | string[]>) => {
            state.sizes = action.payload;
        },

        changeBrands: (state, action: PayloadAction<string[] | number[]>) => {
            state.brands = action.payload;
        },

        setInitialFilters: (state, action: PayloadAction<IFiltrationParams>) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const useFiltersSelector = () => useAppSelector((state) => state.filtersReducer);
export const filtersActions = filterSlice.actions;

export default filterSlice.reducer;
