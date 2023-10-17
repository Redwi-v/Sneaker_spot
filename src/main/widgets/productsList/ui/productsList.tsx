import React, { FC } from 'react';

import styles from './productList.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './pagination/Pagination';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { productService } from '~shared/api';
import { IProduct, IProductData } from '~shared/api';

interface ProductListProps {
    initProductsData: IProductData;
    onOnePage: number;
}

const ProductList: FC<ProductListProps> = (props) => {
    const { onOnePage, initProductsData } = props;
    const filters = {};

    const page = Number(useRouter().query.page);

    const { data: productsData } = useQuery({
        queryKey: ['page', page],

        initialData: initProductsData,
        enabled: !!Object.keys(filters).length,
        queryFn: async () => {
            const res = await productService.getPage(page, onOnePage);

            return res;
        },
    });

    if (!productsData || !productsData.data.length) {
        return (
            <>
                <h1>can't load products</h1>
            </>
        );
    }
    const { data: productsList, totalCount } = productsData;

    console.log(productsList);

    // mappers
    const mapProducts = productsList.map((productInfo) => {
        return <ProductItem key={productInfo.id} {...productInfo} />;
    });

    return (
        <div className={styles.product_list__content}>
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
