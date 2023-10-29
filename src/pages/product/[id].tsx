import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { ProductScreen } from '~screens/product';
import { IProduct, productService } from '~shared/api';
import { DefaultLayout } from '~widgets/layouts';

interface ProductPageProps {
    productInfo: IProduct;
}
const ProductPage: NextPage<ProductPageProps> = (props) => {
    const { productInfo } = props;

    return (
        <DefaultLayout
            title="Catalog"
            description="Our catalog contains hundreds of original sneakers of different brands, sizes and colors."
        >
            <ProductScreen productInfo={productInfo} />
        </DefaultLayout>
    );
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async (context) => {
    const { params } = context;

    if (!params || !params.id || Array.isArray(params.id))
        return {
            notFound: true,
        };

    const data = await productService.getProductById(+params.id);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            productInfo: data,
        },
    };
};

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const res = await productService.getPage(1, 15);

    const paths = res?.data.map((product) => {
        return {
            params: {
                id: String(product.id),
            },
        };
    });

    return {
        paths: paths || [],
        fallback: 'blocking',
    };
};

export default ProductPage;
