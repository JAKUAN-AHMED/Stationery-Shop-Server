import { z } from "zod";

const createProductValidation=z.object({
    name:z.string(),
    brand:z.string(),
    model:z.string(),
    price:z.number().min(0),
    stock:z.number().min(0),
})

const updateProductValidation=createProductValidation.partial();
export const ProductValidation={
    createProductValidation,
    updateProductValidation
}