import QueryBuilder from '../../builder/Querybuilder';
import { sendImageToCloudinary } from '../../utility/sendImageToCloudinary';
import { stationeryProductSearchableFields } from './product.constant';
import { TProduct } from './product.inteface';
import { ProductModel } from './product.model';

const createProductIntoDb = async (file: any, payload: TProduct) => {
  if (file) {
    const imageName = `$${payload.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.productImg = secure_url as string;
  }
  return await ProductModel.create(payload);
};

//all product
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const products = new QueryBuilder(ProductModel.find(), query)
    .search(stationeryProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await products.modelQuery;
  const meta = await products.countTotal();
  return { result, meta };
};

//single product
const singleProduct = async (productId: string) => {
  return await ProductModel.findById(productId);
};

//update product
const updateProduct = async (productId: string, payload: Partial<TProduct>) => {
  return await ProductModel.findByIdAndUpdate(
    productId,
    { $set: payload },
    { new: true, runValidators: true },
  );
};

//product delete
const deleteProduct = async (productId: string) => {
  return await ProductModel.findByIdAndDelete(productId);
};

export const productServices = {
  createProductIntoDb,
  getAllProductFromDB,
  singleProduct,
  updateProduct,
  deleteProduct,
};
