import {z} from 'zod';

export const transferSchema = z.object({
    email : z.string().email(),
})