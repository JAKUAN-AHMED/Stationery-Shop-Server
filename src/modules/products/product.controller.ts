import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { productServices } from "./product.service";

const createProduct=catchAsync(async(req,res)=>{
    const product=await productServices.createProductIntoDb(req.body);
   try{
        sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'product created successfully',
          data: product,
        });
    }catch(err:any){
         sendResponse(res, {
           statusCode: 400,
           success: false,
           message: err.message,
           data: [],
         });
    }
})


const getAllProduct=catchAsync(async(req,res)=>{
    const products=await productServices.getAllProductFromDB();
    const isHas=products.length>0 ? true:false;
    sendResponse(res,{
        statusCode:isHas ? 200 : 404,
        success:isHas?true:false,
        message:isHas ? "All products retrieved successfully" :"there is no product available",
        data:isHas? products : []
    })
})

//single product
const singleProduct=catchAsync(async(req,res)=>{
    const product=await productServices.singleProduct(req.params.productId);
    const isHas=product? true:false;
    sendResponse(res,{
        statusCode:isHas ? 200 : 404,
        success:isHas?true:false,
        message:isHas ? "product retrieved successfully" :" product not available",
        data:isHas? product : []
    })
})

//update
const updateProduct=catchAsync(async(req,res)=>{
    const product=await productServices.updateProduct(req.params.productId,req.body);
    const isHas=product? true:false;
    sendResponse(res, {
      statusCode: isHas ? 200 : 404,
      success: isHas ? true : false,
      message: isHas
        ? 'product updated successfully'
        : ' product not available',
      data: isHas ? product : [],
    });
})

//delete
const deleteProduct = catchAsync(async (req, res) => {
  const deletedProduct = await productServices.deleteProduct(req.params.productId);
  const isHas = deletedProduct ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas
      ? 'product deleted successfully'
      : ' product not found',
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
  deleteProduct
};