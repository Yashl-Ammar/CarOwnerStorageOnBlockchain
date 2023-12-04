import {z} from 'zod';

export const getVehicleSchema = z.object({
    search : z.string().min(2,{message: 'Must be more than 2 characters'}).max(15, {message: 'Must be less than 16 characters'}),
})