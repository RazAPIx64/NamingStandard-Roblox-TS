// api/crypt.d.ts

/**
 * The **crypt** library provides methods for the encryption and decryption of string data.
*/

declare namespace crypt {
    /**
     * Encodes a string of bytes into Base64.
     *
     * @param data - The raw string data to encode.
     * @returns Base64-encoded string.
     *
     * @example
     * const encoded = crypt.base64encode("Hello, World!");
     * print(encoded); // "SGVsbG8sIFdvcmxkIQ=="
     */
    export function base64encode(data: string): string;

    /**
     * Decodes a Base64 string to raw bytes.
     *
     * @param data - Base64-encoded string.
     * @returns Raw decoded string.
     *
     * @example
     * const decoded = crypt.base64decode("SGVsbG8sIFdvcmxkIQ==");
     * print(decoded); // "Hello, World!"
     */
    export function base64decode(data: string): string;

    /**
     * Encrypts a string using AES.
     *
     * Returns a tuple: [encrypted_base64, iv_base64]
     *
     * If `iv` is not provided, a random one is generated and returned.
     * Key must be a 256-bit key (32 bytes), typically Base64-encoded.
     * Default mode: 'CBC'
     *
     * Supported modes: 'CBC', 'ECB', 'CTR', 'CFB', 'OFB', 'GCM'
     *
     * 🪲 Compatibility: Not all executors support all modes or this function.
     *
     * @param data - The plaintext to encrypt.
     * @param key - 256-bit key (Base64-encoded).
     * @param iv - Optional Base64-encoded IV.
     * @param mode - Cipher mode (default: 'CBC').
     * @returns LuaTuple<[encryptedData: string, iv: string]>
     *
     * @example
     * const key = crypt.generatekey();
     * const [encrypted, iv] = crypt.encrypt("secret", key, undefined, "CBC");
     */
    export function encrypt(
        data: string,
        key: string,
        iv?: string,
        mode?: CipherMode
    ): LuaTuple<[string, string]>;

    /**
     * Decrypts a Base64-encoded encrypted string.
     *
     * @param data - Base64-encoded encrypted data.
     * @param key - 256-bit key (Base64-encoded).
     * @param iv - Base64-encoded IV used during encryption.
     * @param mode - Cipher mode used (must match encryption).
     * @returns Decrypted plaintext string.
     *
     * 🪲 Compatibility: Support varies across executors.
     *
     * @example
     * const decrypted = crypt.decrypt(encrypted, key, iv, "CBC");
     * assert(decrypted === "secret");
     */
    export function decrypt(
        data: string,
        key: string,
        iv: string,
        mode?: CipherMode
    ): string;

    /**
     * Generates a random sequence of bytes of the given size.
     *
     * Returns the bytes as a Base64-encoded string.
     *
     * @param size - Number of random bytes to generate.
     * @returns Base64-encoded random bytes.
     *
     * @example
     * const bytes = crypt.generatebytes(16); // 16 raw bytes → Base64
     * print(crypt.base64decode(bytes).length); // 16
     */
    export function generatebytes(size: number): string;

    /**
     * Generates a Base64-encoded 256-bit (32-byte) key suitable for AES.
     *
     * Can be used directly in `encrypt` and `decrypt`.
     *
     * @returns Base64-encoded 256-bit key.
     *
     * @example
     * const key = crypt.generatekey();
     * print(crypt.base64decode(key).length); // 32
     */
    export function generatekey(): string;

    /**
     * Hashes the input string using the specified algorithm.
     *
     * @param data - The data to hash.
     * @param algorithm - One of supported hash algorithms.
     * @returns Hexadecimal hash string (uppercase).
     *
     * Supported algorithms:
     * - 'md5'
     * - 'sha1'
     * - 'sha256'
     * - 'sha384'
     * - 'sha512'
     * - 'sha3-224'
     * - 'sha3-256'
     * - 'sha3-512'
     *
     * @example
     * const hash = crypt.hash("Hello", "sha256");
     * print(hash); // "185F8DB32271FE25F561A6FC938B2E264306EC304EDA518007D1764826381969"
     */
    export function hash(data: string, algorithm: HashAlgorithm): string;
}

/**
 * Supported AES cipher modes.
 */
type CipherMode = 'CBC' | 'ECB' | 'CTR' | 'CFB' | 'OFB' | 'GCM';

/**
 * Supported hash algorithms.
 */
type HashAlgorithm =
    | 'md5'
    | 'sha1'
    | 'sha256'
    | 'sha384'
    | 'sha512'
    | 'sha3-224'
    | 'sha3-256'
    | 'sha3-512';

// === Aliases ===

/**
 * Namespace-style aliases for convenience.
 */
declare namespace base64 {
    export const encode: typeof crypt.base64encode;
    export const decode: typeof crypt.base64decode;
}

/**
 * Direct global aliases (some executors expose these)
 */
declare const base64_encode: typeof crypt.base64encode;
declare const base64_decode: typeof crypt.base64decode;
declare const crypt_base64_encode: typeof crypt.base64encode;
declare const crypt_base64_decode: typeof crypt.base64decode;
