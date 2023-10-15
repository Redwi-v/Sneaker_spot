import React, { FC } from 'react';

import styles from './filters.module.scss';

interface FiltersProps {}
const Filters: FC<FiltersProps> = (props) => {
    const {} = props;
    return (
        <div className={styles.filters}>
            <h1>Filters</h1>
        </div>
    );
};

export default Filters;
