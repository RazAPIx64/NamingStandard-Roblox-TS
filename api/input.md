// api/Input.d.ts

/**
 * The **input** functions allow you to dispatch synthetic inputs on behalf of the user.
 *
 * These functions simulate real user input such as:
 * - Mouse movement (absolute and relative)
 * - Mouse clicks and button presses
 * - Scrolling
 *
 * ⚠️ These functions only work when the game window is in focus.
 * Use `isrbxactive()` to check before dispatching input.
 */

/**
 * Returns whether the game's window is currently in focus.
 *
 * Most input functions will fail silently or be ignored if the window is not active.
 *
 * @returns `true` if the Roblox window is focused, `false` otherwise.
 *
 * @example
 * if (isrbxactive()) {
 *     mouse1click();
 * }
 */
declare function isrbxactive(): boolean;

/**
 * Alias for `isrbxactive`.
 */
declare const isgameactive: typeof isrbxactive;

/**
 * Dispatches a left mouse button **click** (press + release).
 *
 * Simulates a full click at the current cursor position.
 *
 * @example
 * if (isrbxactive()) {
 *     mouse1click();
 * }
 */
declare function mouse1click(): void;

/**
 * Dispatches a left mouse button **press** (down).
 *
 * Does not release — use `mouse1release()` to release.
 */
declare function mouse1press(): void;

/**
 * Dispatches a left mouse button **release** (up).
 *
 * Should be used after `mouse1press()` to complete a drag or hold.
 */
declare function mouse1release(): void;

/**
 * Dispatches a right mouse button **click** (press + release).
 */
declare function mouse2click(): void;

/**
 * Dispatches a right mouse button **press** (down).
 */
declare function mouse2press(): void;

/**
 * Dispatches a right mouse button **release** (up).
 */
declare function mouse2release(): void;

/**
 * Moves the mouse cursor to an absolute screen position.
 *
 * Coordinates are in pixels from the top-left of the screen.
 *
 * @param x - The x-coordinate (pixels).
 * @param y - The y-coordinate (pixels).
 *
 * @example
 * const viewport = workspace.CurrentCamera.ViewportSize;
 * mousemoveabs(viewport.X / 2, viewport.Y / 2); // Move to center
 */
declare function mousemoveabs(x: number, y: number): void;

/**
 * Moves the mouse cursor by a relative offset.
 *
 * Useful for simulating small movements or camera rotation.
 *
 * @param x - Horizontal offset (pixels).
 * @param y - Vertical offset (pixels).
 *
 * @example
 * mousemoverel(10, -5); // Move right 10px, up 5px
 */
declare function mousemoverel(x: number, y: number): void;

/**
 * Dispatches a mouse scroll event.
 *
 * Positive = scroll up, Negative = scroll down.
 *
 * @param pixels - The number of pixels to scroll.
 *
 * @example
 * mousescroll(120);  // Scroll up
 * mousescroll(-120); // Scroll down
 */
declare function mousescroll(pixels: number): void;
