import { z } from "zod";

export const createUserValidation=z.object({
    name:z.string(),
    email:z.string().email(),
    phone:z.string(),
    password:z.string(),
    role:z.enum(["user","admin"]).optional()
})
export const updateUserValidation=z.object({
    name:z.string(),
    email:z.string().email(),
    phone:z.string(),
})