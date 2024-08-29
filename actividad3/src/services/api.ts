import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data: { nombre: string }) => axios.post(`${API_URL}/categories`, data);
export const updateCategory = async (nombre: any, data: { nombre: string; }) => {return await axios.put(`/api/categories/name/${nombre}`, data);};
export const deleteCategory = async (nombre: any) => {return await axios.delete(`/api/categories/name/${nombre}`);};
  

export const getProducts = () => axios.get(`${API_URL}/products`);
export const createProduct = (data: { nombre: string, precio: number, stock: number }) => axios.post(`${API_URL}/products`, data);
export const updateProduct = (id: number, data: { nombre: string, precio: number, stock: number }) => axios.put(`${API_URL}/products/${id}`, data);
export const deleteProduct = (id: number) => axios.delete(`${API_URL}/products/${id}`);
