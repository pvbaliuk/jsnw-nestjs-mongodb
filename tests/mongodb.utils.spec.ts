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
    });
});
