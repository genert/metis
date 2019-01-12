// Type definitions for unexpected 10.39
// Project: https://github.com/unexpectedjs/unexpected#readme
// Definitions by: Studds <https://github.com/studds>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*~ Note that ES6 modules cannot directly export callable functions.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

declare module 'unexpected' {
    /*~ This declaration specifies that the function
     *~ is the exported object from the file
     */
    export = expect;

    // ANY
    function expect<T>(actual: T, matcher: 'to be' | 'not to be', expected: T): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be one of' | 'not to be one of', expected: ReadonlyArray<T>): Promise<void>;
    function expect<T>(actual: T, matcher: 'to equal' | 'not to equal', expected: T): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be defined' | 'not to be defined'): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be falsy' | 'not to be falsy'): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be null' | 'not to be null'): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be ok' | 'not to be ok'): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be truthy' | 'not to be truthy'): Promise<void>;
    function expect<T>(actual: T, matcher: 'to be undefined' | 'not to be undefined'): Promise<void>;
    function expect<T>(actual: T, matcher: 'to satisfy' | 'to exhaustively satisfy', expected: any): Promise<void>;

    // STRING
    function expect(actual: string, matcher: 'to be empty' | 'not to be empty' | 'to be non-empty'): Promise<void>;
    function expect(actual: string, matcher: 'to be greater than' | 'not to be greater than', expected: string): Promise<void>;
    function expect(
        actual: string,
        matcher: 'to be greater than or equal to' | 'not to be greater than or equal to',
        expected: string
    ): Promise<void>;
    function expect(actual: string, matcher: 'to be less than' | 'not to be less than', expected: string): Promise<void>;
    function expect(actual: string, matcher: 'to be less than or equal to' | 'not to be less than or equal to', expected: string): Promise<void>;
    function expect(actual: string, matcher: 'to be within' | 'not to be within', start: string, end: string): Promise<void>;
    function expect(actual: string, matcher: 'to begin with' | 'not to begin with', expected: string | RegExp): Promise<void>;
    function expect(actual: string, matcher: 'to start with' | 'not to start with', expected: string | RegExp): Promise<void>;
    function expect(actual: string, matcher: 'to end with' | 'not to end with', expected: string | RegExp): Promise<void>;
    function expect(actual: string, matcher: 'to contain' | 'not to contain', ...expected: string[]): Promise<void>;
    function expect(actual: string, matcher: 'to match' | 'not to match', expected: string | RegExp): Promise<void>;
    function expect(actual: string, matcher: 'to have length' | 'not to have length', expected: number): Promise<void>;

    // NUMBER
    function expect(actual: number, matcher: 'to be close to' | 'not to be close to', expected: number, epsilon?: number): Promise<void>;
    function expect(actual: number, matcher: 'to be finite' | 'not to be finite'): Promise<void>;
    function expect(actual: number, matcher: 'to be infinite' | 'not to be infinite'): Promise<void>;
    function expect(actual: number, matcher: 'to be greater than' | 'not to be greater than', expected: number): Promise<void>;
    function expect(
        actual: number,
        matcher: 'to be greater than or equal to' | 'not to be greater than or equal to',
        expected: number
    ): Promise<void>;
    function expect(actual: number, matcher: 'to be less than' | 'not to be less than', expected: number): Promise<void>;
    function expect(actual: number, matcher: 'to be less than or equal to' | 'not to be less than or equal to', expected: number): Promise<void>;
    function expect(actual: number, matcher: 'to be NaN' | 'not to be NaN'): Promise<void>;
    function expect(actual: number, matcher: 'to be negative' | 'not to be negative'): Promise<void>;
    function expect(actual: number, matcher: 'to be positive' | 'not to be positive'): Promise<void>;
    function expect(actual: number, matcher: 'to be within' | 'not to be within', start: number, end: number): Promise<void>;

    // FUNCTION
    function expect(actual: () => void, matcher: 'to throw' | 'not to throw', error?: string | RegExp): Promise<void>;
    function expect(actual: () => void, matcher: 'to throw a' | 'not to throw a', error: Error): Promise<void>;
    function expect(actual: () => void, matcher: 'to error' | 'not to error', error?: string | RegExp): Promise<void>;
    function expect(actual: (...args: any[]) => any, matcher: 'to call the callback'): Promise<void>;
    function expect(actual: (...args: any[]) => any, matcher: 'to call the callback with error'): Promise<void>;
    function expect(actual: (...args: any[]) => any, matcher: 'to call the callback without error'): Promise<void>;

    // BOOLEAN
    function expect(actual: boolean, matcher: 'to be true' | 'not to be true'): Promise<void>;
    function expect(actual: boolean, matcher: 'to be false' | 'not to be false'): Promise<void>;

    // OBJECTS
    function expect(actual: object, matcher: 'to be canonical'): Promise<void>;
    function expect(actual: object, matcher: 'to be empty' | 'not to be empty'): Promise<void>;
    function expect(actual: object, matcher: 'to be empty' | 'not to be empty'): Promise<void>;
    function expect(actual: object, matcher: 'to have a value satisfying' | 'not to have a value satisfying', expected: any): Promise<void>;
    function expect(
        actual: object,
        matcher: 'to have a value exhaustively satisfying' | 'not to have a value exhaustively satisfying',
        expected: any
    ): Promise<void>;
    function expect(actual: object, matcher: 'to have a key' | 'not to have a key', expected: string): Promise<void>;
    function expect(actual: object, matcher: 'to only have a key' | 'to not only have a key', expected: string): Promise<void>;
    function expect(actual: object, matcher: 'to have keys' | 'not to have keys', ...expected: string[]): Promise<void>;
    function expect(actual: object, matcher: 'to only have keys' | 'to not only have keys', ...expected: string[]): Promise<void>;
    function expect(actual: object, matcher: 'to have keys satisfying', expected: any): Promise<void>;
    function expect(actual: object, matcher: 'to have properties' | 'not to have properties', expected: ReadonlyArray<string>): Promise<void>;
    function expect(actual: object, matcher: 'to have own properties' | 'not to have own properties', expected: ReadonlyArray<string>): Promise<void>;
    function expect(actual: object, matcher: 'to have properties' | 'to have own properties', expected: object): Promise<void>;
    function expect(actual: object, matcher: 'to have property' | 'not to have property', expected: string, value?: any): Promise<void>;
    function expect(actual: object, matcher: 'to have own property' | 'not to have own property', expected: string, value?: any): Promise<void>;
    function expect(actual: object, matcher: 'to have values satisfying' | 'to have values exhaustively satisfying', expected: any): Promise<void>;

    // PROMISE

    function expect<T>(actual: Promise<T>, matcher: 'to be fulfilled'): Promise<void>;
    function expect<T>(actual: Promise<T>, matcher: 'to be fulfilled with', expected: T): Promise<void>;
    function expect<T>(actual: Promise<T>, matcher: 'to be fulfilled with value satisfying', expected: any): Promise<void>;
    function expect<T>(actual: Promise<T>, matcher: 'to be fulfilled with value exhaustively satisfying', expected: any): Promise<void>;

    function expect<T>(actual: Promise<T>, matcher: 'to be rejected'): Promise<void>;
    function expect<T>(actual: Promise<T>, matcher: 'to be rejected with', expected: any): Promise<void>;
    function expect<T>(actual: Promise<T>, matcher: 'to be rejected with error satisfying', expected: any): Promise<void>;

    // ERROR
    function expect(actual: Error, matcher: 'to have message', expected: string | RegExp): Promise<void>;

    // ARRAY
    function expect(actual: ReadonlyArray<any>, matcher: 'to be empty' | 'not to be empty' | 'to be non-empty'): Promise<void>;
    function expect<T>(actual: ReadonlyArray<T>, matcher: 'to contain' | 'not to contain', ...expected: T[]): Promise<void>;
    function expect(actual: object, matcher: 'to have an item satisfying' | 'not to have an item satisfying', expected: any): Promise<void>;
    function expect(
        actual: object,
        matcher: 'to have an item exhaustively satisfying' | 'not to have an item exhaustively satisfying',
        expected: any
    ): Promise<void>;
    function expect(actual: object, matcher: 'to have items satisfying' | 'to have items exhaustively satisfying', expected: any): Promise<void>;
    function expect(actual: ReadonlyArray<any>, matcher: 'to have length' | 'not to have length', expected: number): Promise<void>;

    function failFn<A extends Array<any> = []>(format: string, ...args: A): void;
    function failFn<E extends Error>(error: E): void;

    /*~ If you want to expose types from your module as well, you can
     *~ place them in this block. Often you will want to describe the
     *~ shape of the return type of the function; that type should
     *~ be declared in here, as this example shows.
     */
    namespace expect {
        export interface PluginDefinition {
            name?: string;
            version?: string;
            dependencies?: Array<string>;
            installInto(unexpected: typeof expect): void;
        }

        export interface TypeDefinition<T> {
            name: string;
            identify(value: any): value is T;
            base?: string;
            equal?(a: T, b: T, equal: (a: any, b: any) => boolean): boolean;
            inspect?(value: T, depth: number, output: any, inspect: (value: any, depth: number) => any): void;
        }
        /**
         * @see http://unexpected.js.org/api/clone/
         */
        export const clone: () => typeof expect;

        /**
         * @see http://unexpected.js.org/api/addAssertion/
         */
        export const addAssertion: <T, A extends Array<any> = []>(
            pattern: string,
            handler: (unexpected: typeof expect, subject: T, ...args: A) => void
        ) => typeof expect;

        /**
         * @see http://unexpected.js.org/api/addType/
         */
        export const addType: <T>(typeDefinition: TypeDefinition<T>) => typeof expect;

        /**
         * @see http://unexpected.js.org/api/fail/
         */
        export const fail: typeof failFn;

        /**
         * @see http://unexpected.js.org/api/freeze/
         */
        export const freeze: () => typeof expect;

        /**
         * @see http://unexpected.js.org/api/use/
         */
        export const use: (plugin: PluginDefinition) => typeof expect;
    }
}