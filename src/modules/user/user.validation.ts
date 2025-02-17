import { z } from "zod";

export const createUserValidation=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string(),
    role:z.enum(["user","admin"]).optional()
})