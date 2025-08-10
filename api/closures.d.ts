// api/Closures.d.ts

/**
 * The **closure** functions are used to create, identify, and interact with Luau closures.
 *
 */

/**
 * Returns whether the currently running function was called by the executor.
 *
 * Useful for distinguishing between game-triggered and executor-triggered metamethod calls.
 *
 * @returns `true` if the caller is the executor; `false` if triggered by the game.
 *
 * @example
 * const oldNamecall = hookmetamethod(game, "__namecall", function(self, ...) {
 *     if (checkcaller()) {
 *         if (self === game) error("No __namecall on game!");
 *     }
 *     return oldNamecall(self, ...);
 * });
 */
declare function checkcaller(): boolean;

/**
 * Creates a new closure from the bytecode of the given function.
 *
 * The new function behaves identically but has a different reference (`!==`).
 *
 * @param func - The function to clone.
 * @returns A new function with identical behavior.
 *
 * @example
 * const foo = () => print("Hello");
 * const bar = clonefunction(foo);
 * foo(); // "Hello"
 * bar(); // "Hello"
 * print(foo === bar); // false
 */
declare function clonefunction<T extends (...args: any[]) => any>(func: T): T;

/**
 * Returns the script responsible for the currently running function.
 *
 * Useful for filtering metamethod hooks based on caller script.
 *
 * @returns The `BaseScript` instance that owns the calling thread.
 *
 * @example
 * const playerGui = game.GetService("Players").LocalPlayer.PlayerGui;
 * hookmetamethod(game, "__namecall", function(self, ...) {
 *     const caller = getcallingscript();
 *     if (caller.IsDescendantOf(caller, playerGui)) {
 *         error("Blocked");
 *     }
 *     return oldHook(self, ...);
 * });
 */
declare function getcallingscript(): BaseScript;

/**
 * Hooks a function, replacing it with a custom implementation.
 *
 * Returns a function that calls the **original** version.
 *
 * > ⚠️ If `func` is a Luau closure (`islclosure(func)`), the `hook` must have ≤ upvalues.
 *
 * @param func - The function to hook.
 * @param hook - The replacement function.
 * @returns A function that calls the original `func`.
 *
 * @alias replaceclosure
 *
 * @example
 * const foo = () => print("Original");
 * const fooOriginal = hookfunction(foo, () => print("Hooked!"));
 *
 * foo();        // "Hooked!"
 * fooOriginal(); // "Original"
 */
declare function hookfunction<T extends (...args: any[]) => any>(
    func: T,
    hook: T
): () => ReturnType<T>;

/**
 * Alias for `hookfunction`.
 */
declare const replaceclosure: typeof hookfunction;

/**
 * Checks if `func` is a **C closure** (implemented in C, not Luau).
 *
 * @param func - The function to check.
 * @returns `true` if it's a C closure.
 *
 * @example
 * print(iscclosure(print)); // true
 * print(iscclosure(() => {})); // false
 */
declare function iscclosure(func: Function): boolean;

/**
 * Checks if `func` is a **Luau closure** (written in Luau).
 *
 * @param func - The function to check.
 * @returns `true` if it's a Luau closure.
 *
 * @example
 * print(islclosure(print)); // false
 * print(islclosure(() => {})); // true
 */
declare function islclosure(func: Function): boolean;

/**
 * Checks if `func` was created by the **executor**.
 *
 * @param func - The function to check.
 * @returns `true` if created by the executor.
 *
 * @alias checkclosure, isourclosure
 *
 * @example
 * print(isexecutorclosure(() => {})); // true
 * print(isexecutorclosure(print)); // false
 */
declare function isexecutorclosure(func: Function): boolean;

/**
 * Alias for `isexecutorclosure`.
 */
declare const checkclosure: typeof isexecutorclosure;

/**
 * Alias for `isexecutorclosure`.
 */
declare const isourclosure: typeof isexecutorclosure;

/**
 * Compiles a string of Luau source code into a function.
 *
 * Returns `[function, undefined]` on success, or `[undefined, errorMessage]` on failure.
 *
 * The returned function uses the **global environment**.
 *
 * @param source - The Luau code to compile.
 * @param chunkname - Optional name for debug/error messages. Defaults to random string.
 * @returns A tuple: `[compiledFunction, error]`
 *
 * @example
 * const [func, err] = loadstring("print('Hello')");
 * assert(func, err);
 * func(); // "Hello"
 */
declare function loadstring(
    source: string,
    chunkname?: string
): LuaTuple<[(() => any) | undefined, string | undefined]>;

/**
 * Wraps a Luau function into a **C closure**.
 *
 * The result behaves the same but:
 * - `iscclosure()` returns `true`
 * - Cannot yield (will throw)
 *
 * Use `task.spawn()` instead of `wait()` or `coroutine.yield()` inside.
 *
 * @param func - The function to wrap.
 * @returns A C-closure-wrapped version of `func`.
 *
 * @example
 * const foo = () => {};
 * const bar = newcclosure(foo);
 * print(iscclosure(foo)); // false
 * print(iscclosure(bar)); // true
 */
declare function newcclosure<T extends (...args: any[]) => any>(func: T): T;
