// api/Console.d.ts

/**
 * The **console** functions are used to interact with a console window that operates in Roblox's thread.
 *
 *
 * Behavior may vary slightly between executors.
 * This definition reflects Script-Ware's implementation.
 */

/**
 * Clears the output of the console window.
 *
 * @example
 * rconsolesettitle("New console");
 * rconsoleprint("Hello, world!");
 * rconsolecreate();
 * rconsoleclear(); // Output is now empty
 */
declare function rconsoleclear(): void;

/**
 * Alias for `rconsoleclear`.
 */
declare const consoleclear: typeof rconsoleclear;

/**
 * Opens the console window.
 *
 * Existing output is preserved unless manually cleared.
 * Some executors may auto-open on print, but do not rely on this behavior.
 *
 * @example
 * rconsolesettitle("My Console");
 * rconsolecreate();
 */
declare function rconsolecreate(): void;

/**
 * Alias for `rconsolecreate`.
 */
declare const consolecreate: typeof rconsolecreate;

/**
 * Closes the console window and clears its output.
 * The title remains unchanged.
 *
 * @example
 * rconsoledestroy(); // Close and clear
 * rconsolecreate();  // Reopen (empty, same title)
 */
declare function rconsoledestroy(): void;

/**
 * Alias for `rconsoledestroy`.
 */
declare const consoledestroy: typeof rconsoledestroy;

/**
 * Waits for the user to input text into the console.
 * This function **yields** the thread until input is received.
 *
 * @returns The text entered by the user.
 *
 * @example
 * rconsoleprint("Enter your name: ");
 * const name = rconsoleinput();
 * rconsoleprint(`Hello, ${name}!`);
 */
declare function rconsoleinput(): string;

/**
 * Alias for `rconsoleinput`.
 */
declare const consoleinput: typeof rconsoleinput;

/**
 * Appends text to the console window.
 *
 * Does **not** add a newline automatically.
 * Does **not** clear existing content.
 *
 * @param text - The text to append.
 *
 * @example
 * rconsoleprint("Hello, ");
 * rconsoleprint("world!\n");
 */
declare function rconsoleprint(text: string): void;

/**
 * Alias for `rconsoleprint`.
 */
declare const consoleprint: typeof rconsoleprint;

/**
 * Sets the title of the console window.
 *
 * @param title - The new title.
 *
 * @example
 * rconsolesettitle("Logger");
 * rconsolecreate(); // Opens with title "Logger"
 */
declare function rconsolesettitle(title: string): void;

/**
 * Alias for `rconsolesettitle`.
 */
declare const rconsolename: typeof rconsolesettitle;

/**
 * Alias for `rconsolesettitle`.
 */
declare const consolesettitle: typeof rconsolesettitle;
