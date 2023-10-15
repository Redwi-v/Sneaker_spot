import axiosInstance from '../config/axiosInstance';

interface IFiltrationParams {
    price: [number, number];
}

class ProductService {
    async getPage(page: number, take: number, filtrationParams?: IFiltrationParams) {
        const { data } = await axiosInstance.get('/product/products/', {
            params: {
                page,
                take,
                filtrationParams,
            },
        });

        return data;
    }
}

export default new ProductService();
