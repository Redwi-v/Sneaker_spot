import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IColor {
    colorCode: string;
    colorName: string;
    colorSizes: number[];
    normalImages: string[];
    smallImages: string[];
}
export interface IProduct {
    id: number;
    name: string;
    price: number;
    purchasesCount: number;
    rating: number;
    description: string;
    brandName: string;
    colors: IColor[];
}

export const productListApi = createApi({
    reducerPath: 'productListApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4300/',
    }),
    endpoints: (builder) => ({
        getProduct: builder.query<IProduct[], string>({
            query: (name) => `products`,
        }),
    }),
});

export const { useGetProductQuery } = productListApi;
