import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './productList.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './pagination/Pagination';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { productService, IProduct, IProductData } from '~shared/api';
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
    const urlDataInstalled = useRef(false);
    const [isInitCall, setIsInitCall] = useState(true);
    const [filtersIsChange, setFiltersIsChange] = useState(false);

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

    useEffect(() => {
        if (haveAnyFilters && !filtersIsChange) {
            refetch();
        }

        if (router.isReady && isInitCall) {
            setIsInitCall(false);
            console.log('rouiting');
        }
    }, [routerPage]);

    useEffect(() => {
        if (haveAnyFilters) {
            const query = { ...router.query };
            delete query.page;

            setFiltersIsChange(true);

            if (isInitCall) {
                refetch();
                setFiltersIsChange(false);
                setIsInitCall(false);
            } else {
                router
                    .replace(
                        {
                            pathname: '/shop/1',
                            query,
                        },
                        undefined,
                        { shallow: true }
                    )
                    .then(() => {
                        refetch();
                        setFiltersIsChange(false);
                    });
            }
        }
    }, [filtersState]);

    useEffect(() => {
        if (!urlDataInstalled.current && router.isReady) {
            setInitFilters();
            urlDataInstalled.current = true;
        }
    }, [router.isReady]);

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
