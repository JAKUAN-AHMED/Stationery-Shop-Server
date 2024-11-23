import { Request } from 'express';
import { Product } from '../interfaces/productInterface';
import ProductModel from '../Models/ProductModel';

const createProductIntoDB = async (productData: Product): Promise<Product> => {
  const newProduct = new ProductModel(productData);
  return await newProduct.save();
};

//get all products
const getAllProductsFromDB = async (
  searchTerm?: string,
): Promise<Product[]> => {
  const filter = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  return await ProductModel.find(filter);
};

//get a product by ID
const getProductByIdFromDB = async (id: string): Promise<Product | null> => {
  return await ProductModel.findById(id);
};

//update a product by Id
const updateProductFromDB = async (
  id: string,
  updateData: Partial<Product>,
): Promise<Product | null> => {
  return await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

//delete a product by Id
const deleteProductFromDB = async (id: string): Promise<Product | null> => {
  return await ProductModel.findByIdAndDelete(id);
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
