import React, { FC, useEffect } from 'react';
import { ProductList } from '~widgets/productsList';
import { Filters } from '~widgets/filters';

import styles from './shopScreen.module.scss';
import { IProduct } from '~shared/api';

interface ShopScreenProps {
    productsList: IProduct[];
    totalCount: number;
    onOnePage: number;
}
const ShopScreen: FC<ShopScreenProps> = (props) => {
    return (
        <div className={styles.shop_screen}>
            <div className={styles.shop_screen__main}>
                <Filters />
                <ProductList {...props} initProductsData={{ data: props.productsList, totalCount: props.totalCount }} />
            </div>
        </div>
    );
};

export default ShopScreen;
