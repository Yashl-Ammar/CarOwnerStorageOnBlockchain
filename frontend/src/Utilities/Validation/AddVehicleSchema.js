import {z} from 'zod';

export const addVehicleSchema = z.object({
    mdate : z.string().min(2,{message : 'Must be filled'}).max(20, {message:'Must be less than or equal to 20'}),
    nplate : z.string().min(2,{message : 'Must be more than 2 character'}).max(20, {message:'Must be less than or equal to 20'}),
    cnumber : z.string().min(2,{message : 'Must be more than 2 character'}).max(20, {message:'Must be less than or equal to 20'}),
    make : z.string().min(2,{message : 'Must be more than 2 character'}).max(20, {message:'Must be less than or equal to 20'}),
    model : z.string().min(2,{message : 'Must be more than 2 character'}).max(20, {message:'Must be less than or equal to 20'}),
    varient : z.string().min(2,{message : 'Must be more than 2 character'}).max(20, {message:'Must be less than or equal to 20'}),
})