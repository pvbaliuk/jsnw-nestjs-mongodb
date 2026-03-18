import {ObjectId} from 'mongodb';

/**
 * @param {string | ObjectId} id
 * @return {ObjectId}
 */
export function coerceObjectId(id: string|ObjectId): ObjectId{
    if(id instanceof ObjectId)
        return id;

    if(ObjectId.isValid(id))
        return new ObjectId(id);

    throw new TypeError(`Invalid argument "id". Expected string, ObjectId, Uint8Array, got: ${typeof id}`);
}

/**
 * @param {object} o
 * @return {object}
 */
export function stripUndefinedFields(o: object): object{
    return Object.fromEntries(
        Object.entries(o)
            .filter(([k, v]) => v !== undefined)
    );
}
