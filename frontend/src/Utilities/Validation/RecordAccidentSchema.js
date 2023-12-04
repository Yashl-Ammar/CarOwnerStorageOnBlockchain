import {z} from 'zod';

export const accidentSchema = z.object({
    accident : z.string().min(2, {message : 'Must be greater than 2 characters'}).max(300, {message : 'Must be lower than 300 characters'}),
})