import React, { FC } from 'react';
import { Selection } from '~shared/uiKit';

import sortingList from '../constants/constants';
import { useFilters } from '~entities/filters';
import { useFiltersSelector } from '~entities/filters';

interface ChangeSortingProps {}
const ChangeSorting: FC<ChangeSortingProps> = (props) => {
    const { changeSorting } = useFilters();
    const { sorting } = useFiltersSelector();

    function handleChange(value: string) {
        sortingList.forEach((item) => {
            if (item.key === value) {
                changeSorting(item.key);
            }
        });
    }

    let defaultValue = 'DEFAULT';
    sortingList.forEach((item) => {
        if (item.key === sorting) {
            defaultValue = item.key;
        }
    });

    const {} = props;
    return <Selection handleChange={handleChange} options={sortingList} defaultValue={defaultValue} />;
};

export default ChangeSorting;
