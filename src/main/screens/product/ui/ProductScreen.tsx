import React, { FC } from 'react';
import { IProduct } from '~shared/api';

interface ProductScreenProps {
    productInfo: IProduct;
}
const ProductScreen: FC<ProductScreenProps> = (props) => {
    const { productInfo } = props;

    return (
        <div>
            <h1>product</h1>
        </div>
    );
};

export default ProductScreen;
