import Link from 'next/link';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './pagination.module.scss';
import { useFilters, useFiltersSelector } from '~entities/filters';

interface PaginationProps {
    totalCount: number;
    onOnePage: number;
    length: number;
}
const Pagination: FC<PaginationProps> = (props) => {
    const { totalCount, onOnePage, length } = props;

    const routers = useRouter();
    const activePage = Number(routers.query.page);

    const totalPages = Math.ceil(totalCount / onOnePage);
    let pagesArray = Array.from(
        {
            length: totalPages > length ? length : totalPages,
        },
        (v, k) => k + 1
    );
    let min = activePage - Math.round(length / 2) + 1;
    let max = activePage + Math.round(length / 2) >= totalPages ? totalPages : activePage + Math.round(length / 2);

    // смотрим когда активная страница достигнет середины
    if (activePage >= Math.round(length / 2) && totalPages >= length) {
        // проходимся по всем элементам изначального масива кроме 0 го индекса
        for (let i = 1; i < pagesArray.length; i++) {
            // если максимальное значение больше страниц переписываем с обратной стороны
            if (max >= totalPages) {
                pagesArray[i] = max - (length - 1) + i;
            } else {
                pagesArray[i] = min + i;
            }
        }
    }

    const mappedPaginationLinks = pagesArray.map((pageNumber) => {
        return <PaginationLink query={routers.query} pageNumber={pageNumber} key={pageNumber} />;
    });

    return (
        <>
            <ul className={styles.pagination_list}>{mappedPaginationLinks}</ul>
            <span className={styles.pages_counter}>{`${activePage} of ${totalPages}`}</span>
        </>
    );
};

const PaginationLink: FC<{ pageNumber: number; query: any }> = (props) => {
    const { query } = props;
    const queryParams = { ...query };
    delete queryParams.page;

    const routers = useRouter();
    const activePage = Number(routers.query.page);

    const isActivePage = activePage === props.pageNumber;
    const { getActiveFilters } = useFilters();
    const activeFilters = getActiveFilters();

    const haveAnyFilters = !!Object.values(activeFilters).length;

    return (
        <li>
            <Link
                className={`${styles.link} ${isActivePage && styles.activeLink}`}
                href={{
                    pathname: `/shop/${props.pageNumber}`,
                    query: queryParams,
                }}
                shallow={haveAnyFilters}
            >
                {props.pageNumber}
            </Link>
        </li>
    );
};

export default Pagination;
