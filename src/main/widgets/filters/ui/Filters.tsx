import React, { FC } from 'react';

import styles from './filters.module.scss';
import { ChangeSizes } from '~features/changeSizes';
import { useFilters, useFiltersSelector } from '~entities/filters';
import { ChangeColor } from '~features/changeColors';
import { ChangeBrands } from '~features/changeBrand';

interface FiltersProps {}
const Filters: FC<FiltersProps> = (props) => {
    const {} = props;

    const { sizes, brands } = useFiltersSelector();
    const { changeSizes, changeBrands } = useFilters();

    return (
        <div className={styles.filters}>
            <div className={styles.filter_block}>
                <h3 className={styles.title}>Sizes</h3>
                <ChangeSizes changeSizesAction={changeSizes} defaultValues={sizes || []} />
            </div>
            <div className={styles.filter_block}>
                <h3 className={styles.title}>Colors</h3>
                <ChangeColor />
            </div>
            <div className={styles.filter_block}>
                <h3 className={styles.title}>Brands</h3>
                <ChangeBrands changeBrandsAction={changeBrands} defaultValues={brands || []} />
            </div>
        </div>
    );
};

export default Filters;
