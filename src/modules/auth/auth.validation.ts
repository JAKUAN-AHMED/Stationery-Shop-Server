import { z } from "zod";

// change password
export const ChangePassValidationSchema = z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'password is required' }),
  });
