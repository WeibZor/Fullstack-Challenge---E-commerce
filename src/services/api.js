import axios from 'axios';

const client = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 12000,
});

export const fetchProductsApi = async () => {
  const response = await client.get('/products');
  return response.data;
};

export const fetchProductByIdApi = async (id) => {
  const response = await client.get(`/products/${id}`);
  return response.data;
};

export const fetchCategoriesApi = async () => {
  const response = await client.get('/products/categories');
  return response.data;
};

export default client;
