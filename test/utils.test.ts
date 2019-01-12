import { createQueryString, generateUUIDV4 } from '../src/Utils';
import * as expect from 'unexpected';

describe('utils', () => {
    describe('generateUUIDV4', () => {
        it('should return RFC4122 version 4 compliant solution', () => {
            expect(generateUUIDV4(), 'to have length', 36);
        });
    });

    describe('createQueryString', () => {
        it('should return empty string', () => {
            expect(createQueryString({}), 'to equal', '');
        });

        it('should return empty string', () => {
            expect(createQueryString(), 'to equal', '');
        });

        it('should return single parameter query', () => {
            expect(createQueryString({ test: 123 }), 'to equal', 'test=123');
        });

        it('should return multiple parameters query', () => {
            expect(createQueryString({ test: 123, mock: 1337 }), 'to equal', 'test=123&mock=1337');
        });
    })
})