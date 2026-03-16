import {z} from 'zod';
import {ObjectId} from 'mongodb';
import {coerceObjectId} from './mongodb.utils';

const currentDate = () => new Date();

export const objectIdSchema = z.custom<string|ObjectId>()
    .refine(val => ObjectId.isValid(val), {error: 'Invalid ObjectId'})
    .transform((val) => coerceObjectId(val));

export const documentSchema = z.object({
    _id: objectIdSchema.default(() => new ObjectId()),
    _version: z.number().min(0).default(0),
    created_at: z.date().default(currentDate),
    updated_at: z.date().default(currentDate),
    deleted_at: z.date().nullable().default(null)
});
