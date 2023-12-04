import { z } from 'zod';

export const registerSchema = z.object({
  fname: z.string().min(1, { message: 'Must be filled' }).max(30, { message: 'Must be less than 30' }),
  lname: z.string().min(1, { message: 'Must be filled' }).max(30, { message: 'Must be less than 30' }),
  dob: z.string().min(1, { message: 'Must be filled' }),
  phoneNumber: z.string().regex(/^\d{11}$/, { message: 'Must be only numbers and must have a length of 11' }),
  cnic: z.string().regex(/^\d{13}$/, { message: 'Must be only numbers and must have a length of 13' }),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must have minimum eight characters, at least one letter and one number',
  }),
  cpassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must have minimum eight characters, at least one letter and one number',
  }),
});
