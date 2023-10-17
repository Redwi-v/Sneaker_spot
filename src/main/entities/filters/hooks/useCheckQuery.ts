import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { filtersActions, useFiltersSelector } from '../model/filtersSlice';
import { useAppDispatch } from '~shared/state/hooks/hooks';

const useCheckQuery = () => {
    const router = useRouter();
    const AppDispatch = useAppDispatch();

    AppDispatch(filtersActions.setTerm('hi'));
};

export default useCheckQuery;
