import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { filtersActions, useFiltersSelector } from '../model/filtersSlice';
import { useAppDispatch } from '~shared/state/hooks/hooks';
import { useEffect } from 'react';

const useFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const AppDispatch = useAppDispatch();

    useEffect(() => {
        for (let key in router.query) {
            const value = router.query[key];

            if (Array.isArray(value)) break;

            if (value && key === 'term') {
                AppDispatch(filtersActions.setTerm(value));
            }
        }
    }, [router.query]);

    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    const { term } = useFiltersSelector();

    // functions
    const setQueryParam = (name: string, value: string) => {
        current.set(name, value);

        // cast to string
        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : '';

        router.push(`${pathname}${query}`);
    };

    const setTerm = (value: string) => {
        AppDispatch(filtersActions.setTerm(value));
        setQueryParam('term', value);
    };

    return {
        setTerm,
    };
};

export default useFilters;
