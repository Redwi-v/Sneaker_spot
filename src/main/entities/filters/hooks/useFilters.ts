import { useRouter } from 'next/router';
import { filtersActions, useFiltersSelector } from '../model/filtersSlice';
import { useAppDispatch } from '~shared/state/hooks/hooks';
import { IFiltrationParams, SortingParams } from '~shared/api';

const useFilters = () => {
    const AppDispatch = useAppDispatch();
    const filterSelector = useFiltersSelector();
    const router = useRouter();

    const setTerm = (value: string) => {
        router.query.term = value;
        router.push(router, undefined, {
            shallow: true,
        });
        AppDispatch(filtersActions.setTerm(value));
    };

    const getActiveFilters = () => {
        let filters: IFiltrationParams = {};
        Object.keys(filterSelector).forEach((key) => {
            // @ts-ignore
            if (filterSelector[key] && filterSelector[key] !== null) {
                // @ts-ignore
                filters[key] = filterSelector[key];
            }
        });

        return filters;
    };

    const setInitFilters = () => {
        const query = router.query;
        const queryParams: any = {};

        // FIXME: переделать так чтобы поля брались из слайса
        Object.keys(query).forEach((key) => {
            if (key === 'term') queryParams.term = query[key];
            if (key === 'sizes') queryParams.sizes = query[key];
            if (key === 'colors') queryParams.colors = query[key];
            if (key === 'brand') queryParams.brand = query[key];
            if (key === 'price') queryParams.price = query[key];
            if (key === 'sorting') queryParams.sorting = query[key];
        });

        AppDispatch(filtersActions.setInitialFilters(queryParams));
    };

    const changeSorting = (param: SortingParams) => {
        AppDispatch(filtersActions.changeSorting(param));
    };
    return {
        setTerm,
        getActiveFilters,
        setInitFilters,
        changeSorting,
    };
};

export default useFilters;
