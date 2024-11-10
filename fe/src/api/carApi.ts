import BrandPullDown from '../interfaces/car';
import {baseAxios} from './axios'

export const getNewProduct = async () => {
    try {
      const res = await baseAxios.get(`home/new-product?pageSize=8`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
};

export const getPullDownBranch = async (): Promise<BrandPullDown[]> => {
    try {
      const res = await baseAxios.get(`/brand`);
      return res.data as BrandPullDown[];
    } catch (error) {
      return Promise.reject(error);
    }
};