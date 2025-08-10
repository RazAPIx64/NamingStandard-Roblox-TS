// api/cache.d.ts

/**
 * The **cache** library provides methods for modifying the internal Instance cache.
 *
 * These utilities are useful for bypassing detection, managing references,
 * or simulating instance invalidation in exploit environments.
 *
 */
declare namespace cache {
    /**
     * Deletes `object` from the Instance cache. Effectively invalidates `object`
     * as a valid reference to the underlying Instance.
     *
     * After invalidation, comparisons like `object == game:GetService(...)` will fail.
     *
     * @param object The Instance to invalidate.
     * @returns A function that returns `undefined` (for compatibility).
     *
     * @example
     * const lighting = game.GetService("Lighting");
     * cache.invalidate(lighting);
     * print(lighting, lighting === game.GetService("Lighting")); // → Lighting, false
     */
    export function invalidate(object: Instance): () => undefined;

    /**
     * Checks whether `object` exists in the Instance cache.
     *
     * @param object The Instance to check.
     * @returns `true` if the object is cached; `false` otherwise.
     *
     * @example
     * const lighting = game.GetService("Lighting");
     * cache.invalidate(lighting);
     * print(cache.iscached(lighting)); // → false
     */
    export function iscached(object: Instance): boolean;

    /**
     * Replaces `object` in the Instance cache with `newObject`.
     * Future references to `object` will behave as if they are `newObject`.
     *
     * ⚠️ Dangerous: Can lead to confusing behavior if misused.
     *
     * @param object The original Instance to replace.
     * @param newObject The new Instance to map to.
     *
     * @example
     * const lighting = game.GetService("Lighting");
     * const players = game.GetService("Players");
     * cache.replace(lighting, players);
     * print(lighting); // → Players
     */
    export function replace(object: Instance, newObject: Instance): void;
}

/**
 * 🌍 Global: Returns a copy of the Instance reference to `object`.
 *
 * The clone is **not equal** to the original (`==` returns `false`),
 * but both refer to the same underlying Instance.
 *
 * Useful for evading detection or managing references without direct equality.
 *
 * @param object The Instance to clone.
 * @returns A new reference to the same Instance.
 *
 * @example
 * const lighting = game.GetService("Lighting");
 * const clone = cloneref(lighting);
 * print(lighting == clone); // → false
 * print(compareinstances(lighting, clone)); // → true
 */
declare function cloneref(object: Instance): Instance;

/**
 * 🌍 Global: Returns whether objects `a` and `b` reference the same Instance,
 * regardless of Lua reference equality.
 *
 * This is useful when comparing clonerefs or invalidated instances.
 *
 * @param a The first Instance.
 * @param b The second Instance.
 * @returns `true` if both refer to the same Instance; `false` otherwise.
 *
 * @example
 * const lighting = game.GetService("Lighting");
 * const clone = cloneref(lighting);
 * print(compareinstances(lighting, clone)); // → true
 */
declare function compareinstances(a: Instance, b: Instance): boolean;
