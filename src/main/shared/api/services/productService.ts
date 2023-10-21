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

class ProductService {
    getPage = async (page: number, take: number, filtrationParams?: IFiltrationParams): Promise<IProductData | undefined> => {
        const { data } = await axiosInstance.get('/product/products/', {
            params: {
                page,
                take,
                filtrationParams,
            },
        });

        return data;
    };
}

export default new ProductService();
