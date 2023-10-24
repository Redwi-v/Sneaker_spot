import React, { FC } from 'react';

import styles from './filters.module.scss';
import { ChangeSizes } from '~features/changeSizes';
import { useFilters, useFiltersSelector } from '~entities/filters';

interface FiltersProps {}
const Filters: FC<FiltersProps> = (props) => {
    const {} = props;

    const { sizes } = useFiltersSelector();
    const { changeSizes } = useFilters();

    return (
        <div className={styles.filters}>
            <div className={styles.filter_block}>
                <h3 className={styles.title}>Sizes</h3>
                <ChangeSizes changeSizesAction={changeSizes} defaultValues={sizes || []} />
            </div>
        </div>
    );
};

export default Filters;
