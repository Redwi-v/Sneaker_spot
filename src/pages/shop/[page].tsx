import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ShopScreen } from '~screens/shop';
import { productService } from '~shared/api';
import { DefaultLayout } from '~widgets/layouts';
import { IProduct } from '~widgets/productsList';

const itemsOnOnePage = 9;

interface ISopPageProps {
    productsList: IProduct[];
    totalCount: number;
}

const ShopPage: NextPage<ISopPageProps> = (props) => {
    return (
        <DefaultLayout
            title="Catalog"
            description="Our catalog contains hundreds of original sneakers of different brands, sizes and colors."
        >
            <ShopScreen {...props} onOnePage={itemsOnOnePage} />
        </DefaultLayout>
    );
};

interface Params extends ParsedUrlQuery {
    page: string;
}

export const getStaticProps: GetStaticProps<ISopPageProps> = async (context) => {
    const { params } = context;

    if (!params?.page || isNaN(+params.page)) {
        return {
            notFound: true,
        };
    }

    const productsPage = +params.page;

    const res = await productService.getPage(productsPage, itemsOnOnePage);

    if (res.data.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            productsList: res.data,
            totalCount: +res.totalCount,
        },
    };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const products = await productService.getPage(1, 2);

    const paths = Array.from({ length: Math.ceil(+products.totalCount / itemsOnOnePage) }).map((_, i) => ({
        params: {
            page: String(i + 1),
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export default ShopPage;
