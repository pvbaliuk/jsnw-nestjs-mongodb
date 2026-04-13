import {stripUndefinedFields} from '../src';

describe('utils', () => {
    describe('stripUndefinedFields', () => {
        it('strips undefined fields', () => {
            const before = {a: 1, b: undefined, c: [1, 2, 3], d: undefined},
                after = {a: 1, c: before.c};

            expect(stripUndefinedFields(before)).toEqual(after);
        });

        it('dont strip fields with null values', () => {
            const before = {a: 1, b: null, c: undefined, d: 4},
                after = {a: 1, b: null, d: 4};

            expect(stripUndefinedFields(before)).toEqual(after);
        });

        it('returns empty object if empty object was provided', () => {
            const before = {};
            expect(stripUndefinedFields(before)).toEqual({})
        });

        it('returns empty object if all fields were stripped', () => {
            const before = {a: undefined, b: undefined, c: undefined},
                after = {};

            expect(stripUndefinedFields(before)).toEqual(after)
        });

        test.each([123, "hello", false, true, [1, 2, 3]])('throws error if non-object value was provided (%p)', (v) => {
            const t = () => stripUndefinedFields(v as any)

            expect(t).toThrow(TypeError)
        });
    });
});
