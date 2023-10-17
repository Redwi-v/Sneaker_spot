import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '~shared/state/hooks/hooks';

export enum SortingParams {
    LOW_PRICE = 'LOW_PRICE',
    HIGHT_PRICE = 'HIGHT_PRICE',
    RATING = 'RATING',
    MOST_POPULAR = 'MOST_POPULAR',
}

interface IFiltersSlice {
    term: string;
    sizes: number[] | null;
    colors: number[] | null;
    brand: string;
    price: number[] | null;

    sorting: SortingParams;
}

const initialState: IFiltersSlice = {
    term: '',
    sizes: null,
    colors: null,
    brand: '',
    price: null,
    sorting: SortingParams.MOST_POPULAR,
};

const filterSlice = createSlice({
    initialState,
    name: 'filters',
    reducers: {
        setTerm: (state, action: PayloadAction<string>) => {
            state.term = action.payload;
        },
    },
});

export const useFiltersSelector = () => useAppSelector((state) => state.filtersReducer);
export const filtersActions = filterSlice.actions;

export default filterSlice.reducer;
