import axiosInstance from '../config/axiosInstance';

export enum SortingParams {
    LOW_PRICE = 'LOW_PRICE',
    HIGHT_PRICE = 'HIGHT_PRICE',
    RATING = 'RATING',
    MOST_POPULAR = 'MOST_POPULAR',
}

interface IObjectKeys {
    [key: string]: any;
}

export interface IFiltrationParams extends IObjectKeys {
    price?: [number, number];
    term?: string;
    sizes?: number[];
    colors?: number[];
    brand?: string;

    sorting?: SortingParams;
}

export interface IProductData {
    data: IProduct[];
    totalCount: number;
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

interface IColor {
    colorName: string;
    colorCode: string;
    colorSizes: number[];
    smallImages: string[];
    normalImages: string[];
}

type colors = { colorName: string; colorCode: string }[];
type brands = { name: string }[];

class ProductService {
    getPage = async (page: number, take: number, filtrationParams?: IFiltrationParams): Promise<IProductData | undefined> => {
        const sortingParam = filtrationParams?.sorting;
        delete filtrationParams?.sorting;

        const params: any = {
            page,
            take,
            filtrationParams,
        };

        if (sortingParam !== SortingParams.RATING) {
            params.sorting = sortingParam;
        }

        const { data } = await axiosInstance.get('/product/products/', {
            params,
        });

        return data;
    };

    getColors = async () => {
        const { data } = await axiosInstance.get<colors>('/product/colors');
        return data;
    };
    getBrands = async () => {
        const { data } = await axiosInstance.get<brands>('/product/brands');
        return data;
    };
}

export default new ProductService();
