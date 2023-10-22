import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFiltrationParams, SortingParams } from '~shared/api';
import { useAppSelector } from '~shared/state/hooks/hooks';

interface IObjectKeys {
    [key: string]: any;
}

interface IFiltersSlice extends IObjectKeys {
    term: string | null;
    sizes: number[] | null;
    colors: number[] | null;
    brand: string | null;
    price: number[] | null;

    sorting: SortingParams;
}

const initialState: IFiltersSlice = {
    term: null,
    sizes: null,
    colors: null,
    brand: null,
    price: null,
    sorting: SortingParams.HIGHT_PRICE,
};

const filterSlice = createSlice({
    initialState,
    name: 'filters',
    reducers: {
        setTerm: (state, action: PayloadAction<string>) => {
            state.term = action.payload;
        },

        changeSorting: (state, action: PayloadAction<SortingParams>) => {
            state.sorting = action.payload;
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
