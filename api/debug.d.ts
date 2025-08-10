// api/debug.d.ts

/**
 * The **debug** library is an extension of the Luau debug library,
 * providing greater control over Luau functions.
 *
 * These functions allow introspection and modification of:
 * - Constants
 * - Upvalues
 * - Prototypes (nested functions)
 * - Stack frames
 * - Function metadata
 *
 * ⚠️ Many of these functions can throw errors if indices are out of range.
 */

// Some of these functions inside of the `debug` library do not exist in Roblox Studio, as they are exploit functions.

declare namespace debug {
    /**
     * Returns the constant at `index` in the constant table of the function or stack level `func`.
     *
     * Throws an error if the constant does not exist.
     *
     * @param func - A function or stack level (number).
     * @param index - The 1-based index of the constant.
     * @returns The constant value (any type).
     *
     * @example
     * function foo() { print("Hello") }
     * print(debug.getconstant(foo, 3)); // "Hello"
     */
    export function getconstant(func: Function | number, index: number): any;

    /**
     * Returns the constant table of the function or stack level `func`.
     *
     * Constants may be `nil` or have gaps — use `pairs`, not `ipairs`.
     *
     * @param func - A function or stack level.
     * @returns An object mapping indices to constants.
     *
     * @example
     * for i, v of pairs(debug.getconstants(foo)) do
     *     print(i, v);
     * end
     */
    export function getconstants(func: Function | number): { [k: number]: any };

    /**
     * Returns debugger information about a function or stack level.
     */
    export interface DebugInfo {
        /** The name of the chunk that created the function */
        source: string;

        /** A printable version of `source` for error messages */
        short_src: string;

        /** The function itself */
        func: Function;

        /**
         * "Lua" if it's a Luau function, "C" if it's a C function
         */
        what: "Lua" | "C";

        /**
         * The current line where the function is executing.
         * -1 if no line info is available.
         */
        currentline: number;

        /**
         * The name of the function (if inferable).
         * Empty string if unknown.
         */
        name: string;

        /** Number of upvalues in the function */
        nups: number;

        /** Number of parameters */
        numparams: number;

        /**
         * 1 if the function accepts variadic arguments, 0 otherwise.
         */
        is_vararg: 0 | 1;
    }

    /**
     * Returns debugger information about a function or stack level.
     *
     * Some fields may be missing in certain environments.
     *
     * @param func - A function or stack level (number).
     * @returns A `DebugInfo` object with function metadata.
     */
    export function getinfo(func: Function | number): DebugInfo;

    /**
     * Returns the proto (nested function) at `index` in the function or stack level.
     *
     * If `active` is `true`, returns all active closures of that proto.
     * Otherwise, returns the prototype (may not be callable in some environments).
     *
     * @param func - A function or stack level.
     * @param index - The 1-based index of the proto.
     * @param active - If true, returns active closures.
     * @returns A function (if `!active`), or array of functions (if `active`).
     *
     * @example
     * const proto = debug.getproto(myFunc, 1, true)[0];
     * proto();
     */
    export function getproto(
        func: Function | number,
        index: number,
        active?: boolean
    ): Function | Function[];

    /**
     * Returns a list of protos (nested functions) defined inside the function or stack level.
     *
     * May return non-callable prototypes — use `getproto(func, i, true)` to get callable versions.
     *
     * @param func - A function or stack level.
     * @returns Array of function prototypes.
     */
    export function getprotos(func: Function | number): Function[];

    /**
     * Returns the value at `index` in the stack frame `level`.
     *
     * If `index` is omitted, returns the entire stack frame as a table.
     *
     * Throws an error if no value exists at that register.
     *
     * @param level - Stack level (1 = current function).
     * @param index - Optional register index (1-based).
     * @returns The value at the register, or the full frame.
     */
    export function getstack(level: number, index?: number): any | { [k: number]: any };

    /**
     * Returns the upvalue at `index` in the function or stack level.
     *
     * An upvalue is a local variable from an outer scope captured by a closure.
     *
     * Throws an error if the upvalue does not exist.
     *
     * Note: Some constants (strings, numbers) may be inlined into the constant table instead.
     *
     * @param func - A function or stack level.
     * @param index - 1-based index of the upvalue.
     * @returns The upvalue.
     */
    export function getupvalue(func: Function | number, index: number): any;

    /**
     * Returns a list of upvalues of the function or stack level.
     *
     * May contain gaps or `nil` values — use `pairs`, not `ipairs`.
     *
     * @param func - A function or stack level.
     * @returns Object mapping indices to upvalue values.
     */
    export function getupvalues(func: Function | number): { [k: number]: any };

    /**
     * Sets the constant at `index` in the function or stack level to `value`.
     *
     * ⚠️ The type of `value` must match the original constant's type.
     *
     * @param func - A function or stack level.
     * @param index - 1-based index of the constant.
     * @param value - New value (must match type).
     */
    export function setconstant(func: Function | number, index: number, value: any): void;

    /**
     * Sets the register at `index` in the stack frame `level` to `value`.
     *
     * ⚠️ The type of `value` must match the original register's type.
     *
     * @param level - Stack level (1 = current).
     * @param index - 1-based register index.
     * @param value - New value (type must match).
     */
    export function setstack(level: number, index: number, value: any): void;

    /**
     * Sets the upvalue at `index` in the function or stack level to `value`.
     *
     * @param func - A function or stack level.
     * @param index - 1-based upvalue index.
     * @param value - New upvalue.
     */
    export function setupvalue(func: Function | number, index: number, value: any): void;
}
