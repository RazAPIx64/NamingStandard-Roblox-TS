// api/filesystem.d.ts

/**
 * The **filesystem** functions allow read and write access to a designated folder
 * in the executor's directory, typically called *workspace*.
 *
 * These functions operate on files and folders using relative or absolute paths.
 *
 * ⚠️ All paths are relative to the executor's workspace unless otherwise specified.
 */

/**
 * Returns the contents of the file located at `path`.
 *
 * @param path - The path to the file.
 * @returns The raw string content of the file.
 *
 * @example
 * writefile("file.txt", "Hello, world!");
 * print(readfile("file.txt")); // "Hello, world!"
 */
declare function readfile(path: string): string;

/**
 * Returns a list of files and folders in the folder located at `path`.
 * The returned paths are full paths (relative to workspace).
 *
 * @param path - The path to the folder.
 * @returns Array of file/folder paths.
 *
 * @example
 * const files = listfiles(".");
 * files.forEach((file) => print(file));
 */
declare function listfiles(path: string): string[];

/**
 * Writes `data` to the file located at `path`.
 * Overwrites the file if it exists.
 *
 * @param path - Path to the file.
 * @param data - String data to write.
 *
 * @example
 * writefile("hello.txt", "Hello, world!");
 */
declare function writefile(path: string, data: string): void;

/**
 * Creates a folder at `path` if it does not already exist.
 *
 * Intermediate directories are not automatically created.
 *
 * @param path - The path of the folder to create.
 *
 * @example
 * makefolder("myfolder");
 * writefile("myfolder/data.txt", "content");
 */
declare function makefolder(path: string): void;

/**
 * Appends `data` to the end of the file at `path`.
 * Creates the file if it does not exist.
 *
 * @param path - Path to the file.
 * @param data - Data to append.
 *
 * @example
 * appendfile("log.txt", "Event occurred\n");
 */
declare function appendfile(path: string, data: string): void;

/**
 * Returns whether `path` points to a file.
 *
 * @param path - The path to check.
 * @returns `true` if it's a file, `false` otherwise.
 *
 * @example
 * writefile("test.txt", "data");
 * print(isfile("test.txt")); // true
 */
declare function isfile(path: string): boolean;

/**
 * Returns whether `path` points to a folder.
 *
 * @param path - The path to check.
 * @returns `true` if it's a folder, `false` otherwise.
 *
 * @example
 * makefolder("saves");
 * print(isfolder("saves")); // true
 */
declare function isfolder(path: string): boolean;

/**
 * Removes the file located at `path`.
 *
 * Does nothing if the file does not exist.
 *
 * @param path - Path to the file to delete.
 *
 * @example
 * writefile("temp.txt", "junk");
 * delfile("temp.txt");
 * print(isfile("temp.txt")); // false
 */
declare function delfile(path: string): void;

/**
 * Removes the folder located at `path`, including all contents.
 *
 * @param path - Path to the folder to delete.
 *
 * @example
 * makefolder("old");
 * writefile("old/data.txt", "backup");
 * delfolder("old");
 * print(isfolder("old")); // false
 */
declare function delfolder(path: string): void;

/**
 * Compiles and returns a function from the Luau code in the file at `path`.
 *
 * Returns `[function, undefined]` on success, or `[undefined, errorMessage]` on failure.
 *
 * The returned function uses the global environment.
 *
 * @param path - Path to the `.lua` file.
 * @param chunkname - Optional name for debug/error messages.
 * @returns A tuple: `[compiledFunction, error]`
 *
 * @example
 * writefile("add.lua", "return ... + 1");
 * const [func, err] = loadfile("add.lua");
 * const result = assert(func, err)(5); // 6
 */
declare function loadfile(
    path: string,
    chunkname?: string
): LuaTuple<[(() => any) | undefined, string | undefined]>;

/**
 * Loads and executes the file at `path` in a new thread.
 *
 * Equivalent to `assert(loadfile(path))()`, but may pass additional context (e.g., filename via `...`).
 *
 * @param path - Path to the file
