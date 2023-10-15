import React, { FC } from 'react';
import { ProductList } from '~widgets/productsList';
import { Filters } from '~widgets/filters';

import styles from './shopScreen.module.scss';
import { IProduct } from '~widgets/productsList/api/productListApi';

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
                <ProductList {...props} />
            </div>
        </div>
    );
};

export default ShopScreen;
