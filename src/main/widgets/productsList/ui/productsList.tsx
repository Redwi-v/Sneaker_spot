import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import styles from './productList.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './pagination/Pagination';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { productService, IProduct, IProductData, IFiltrationParams } from '~shared/api';
import { useFilters, useFiltersSelector } from '~entities/filters';
import ChangeSorting from '~features/changeSorting/ui/ChangeSorting';

interface ProductListProps {
    initProductsData: IProductData;
    onOnePage: number;
}

const ProductList: FC<ProductListProps> = (props) => {
    const { onOnePage, initProductsData } = props;

    const filtersState = useFiltersSelector();
    const router = useRouter();
    const { getActiveFilters, setInitFilters } = useFilters();
    const activeFilters = getActiveFilters();

    let routerPage = Number(router.query.page);

    const haveAnyFilters = !!Object.values(activeFilters).length;

    const { data: productsData, refetch } = useQuery({
        queryKey: ['page', routerPage, filtersState],

        initialData: initProductsData,
        enabled: false,

        queryFn: async () => {
            const res = await productService.getPage(routerPage, onOnePage, activeFilters);

            return res;
        },
    });

    const [canRefetch, setCanRefetch] = useState(false);
    const IsInitFiltersSet = useRef(false);

    const refetchWithStartFilters = () => {
        const query = { ...router.query };
        delete query.page;

        // запрос за страницей отправиться только после редиректа и разрешит изменение страницы после уже пришедшей страницы
        router
            .push(
                {
                    pathname: '/shop/1',
                    query,
                },
                undefined,
                { shallow: true }
            )
            .then(() => {
                refetch().then(() => {
                    setCanRefetch(true);
                });
            });
    };

    useEffect(() => {
        if (haveAnyFilters && !IsInitFiltersSet) {
            refetchWithStartFilters();
        }
        if (IsInitFiltersSet && router.isReady) {
            refetch().then(() => {
                setCanRefetch(true);
            });
        }
    }, [filtersState]);

    useEffect(() => {
        if (haveAnyFilters && canRefetch) {
            refetch();
        }
    }, [routerPage]);

    useEffect(() => {
        if (router.isReady && !IsInitFiltersSet.current) {
            setInitFilters();
            IsInitFiltersSet.current = true;
        }
    }, [router.query]);

    if (!productsData || !productsData.data.length) {
        return (
            <>
                <h1>can't load products</h1>
            </>
        );
    }

    const { data: productsList, totalCount } = productsData;

    // mappers
    const mapProducts = productsList.map((productInfo) => {
        return <ProductItem key={productInfo.id} {...productInfo} />;
    });

    return (
        <div className={styles.product_list__content}>
            <ChangeSorting />
            <ul className={styles.product_list}>{mapProducts}</ul>
            <Pagination totalCount={totalCount} onOnePage={onOnePage} length={7} />
        </div>
    );
};

const ProductItem: FC<IProduct> = (props) => {
    const { name, price, id, colors, description, rating } = props;
    const { smallImages } = colors[0];

    return (
        <li className={styles.product_item}>
            <div className={styles.preview}>
                <Image className={styles.preview_image} src={smallImages[0]} sizes="150px" fill alt={name} />
            </div>

            <Link href={`/product/${id}`}>
                <div className={styles.content_container}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.description}>{description}</p>
                </div>
            </Link>

            <div className={styles.footer}>
                <div className={styles.footer__top}>
                    <div className={styles.content_container}>
                        <div className={styles.footer__reviews}>
                            <Image src={'/images/icons/reviews.png'} width={25} height={25} alt="reviews icon" />
                            <span>125</span>
                        </div>
                        <div className={styles.footer__price}>
                            <span>{price}$</span>
                        </div>
                    </div>
                </div>
                <div className={styles.footer__bottom}>
                    <div className={styles.content_container}>
                        <div className={styles.footer__rating}>
                            <Image src={'/images/icons/star.png'} width={25} height={25} alt="reviews icon" />
                            <span>{rating}</span>
                        </div>

                        <button className={styles.button}>add to cart</button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProductList;
