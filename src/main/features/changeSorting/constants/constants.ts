import { SortingParams } from '~shared/api';
import { IFilters } from '../types/interfaces';

const sortingList: IFilters[] = [
    {
        key: SortingParams.HIGHT_PRICE,
        name: 'First dears',
    },
    {
        key: SortingParams.LOW_PRICE,
        name: 'Cheap first',
    },
    {
        key: SortingParams.MOST_POPULAR,
        name: 'Most popular',
    },
    {
        key: SortingParams.RATING,
        name: 'Rating',
    },
];

export default sortingList;
