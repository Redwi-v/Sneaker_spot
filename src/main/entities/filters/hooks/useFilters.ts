import { useRouter } from 'next/router';
import { filtersActions, useFiltersSelector } from '../model/filtersSlice';
import { useAppDispatch } from '~shared/state/hooks/hooks';
import { IFiltrationParams, SortingParams } from '~shared/api';

const useFilters = () => {
    const AppDispatch = useAppDispatch();
    const filterSelector = useFiltersSelector();
    const router = useRouter();

    const setQueryUrl = (value: any, field: string) => {
        router.query[field] = value;
        router.push(router, undefined, {
            shallow: true,
        });
    };

    // slice changers
    const setTerm = (value: string) => {
        setQueryUrl(value, 'term');
        AppDispatch(filtersActions.setTerm(value));
    };

    const changeSorting = (param: SortingParams) => {
        setQueryUrl(param, 'sorting');
        AppDispatch(filtersActions.changeSorting(param));
    };
    const changeSizes = (params: number[]) => {
        setQueryUrl(params, 'sizes');
        AppDispatch(filtersActions.changeSizes(params));
    };

    const getActiveFilters = () => {
        let filters: IFiltrationParams = {};
        Object.keys(filterSelector).forEach((key) => {
            // @ts-ignore
            if (filterSelector[key] && filterSelector[key] !== null) {
                if (key !== 'updated') {
                    // @ts-ignore
                    filters[key] = filterSelector[key];
                }
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
            if (key === 'sizes')
                queryParams.sizes = (() => {
                    if (typeof query[key] === 'string') {
                        return [Number(query[key])];
                    } else {
                        return query[key];
                    }
                })();
            if (key === 'colors') queryParams.colors = query[key];
            if (key === 'brand') queryParams.brand = query[key];
            if (key === 'price') queryParams.price = query[key];
            if (key === 'sorting') queryParams.sorting = query[key];
        });

        AppDispatch(filtersActions.setInitialFilters(queryParams));
    };

    return {
        setTerm,
        getActiveFilters,
        setInitFilters,
        changeSorting,
        changeSizes,
    };
};

export default useFilters;
