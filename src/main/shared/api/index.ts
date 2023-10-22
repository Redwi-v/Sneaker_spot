import { type } from 'os';
import productService from './services/productService';
import { IProductData, IProduct, SortingParams, IFiltrationParams } from './services/productService';

export { productService, SortingParams };

export type { IProductData, IProduct, IFiltrationParams };
