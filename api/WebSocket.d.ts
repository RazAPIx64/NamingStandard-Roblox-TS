// api/WebSocket.d.ts

/**
 * The WebSocket class provides a simple interface for sending and receiving
 * data over a WebSocket connection.
 *
 * @example
 * const ws = WebSocket.connect("ws://localhost:8080");
 *
 * ws.OnMessage.Connect((message) => {
 *     print(message);
 * });
 *
 * ws.OnClose.Connect(() => {
 *     print("Connection closed");
 * });
 *
 * ws.Send("Hello, World!");
 */
declare namespace WebSocket {
    /**
     * Establishes a WebSocket connection to the specified URL.
     *
     * @param url The URL to connect to (e.g. "ws://localhost:8080")
     * @returns A new WebSocket instance
     */
    function connect(url: string): WebSocket;
}

/**
 * WebSocket instance class.
 */
interface WebSocket {
    /**
     * Sends a message over the WebSocket connection.
     * @param message The message to send (must be a string).
     */
    Send(message: string): void;

    /**
     * Closes the WebSocket connection.
     */
    Close(): void;

    /**
     * Event fired when a message is received from the server.
     * Connect a callback to handle incoming messages.
     *
     * @example
     * ws.OnMessage.Connect((message) => {
     *     print("Received:", message);
     * });
     */
    readonly OnMessage: RBXScriptSignal<(message: string) => void>;

    /**
     * Event fired when the WebSocket connection is closed.
     * This may happen due to network issues, server shutdown, or calling `Close()`.
     *
     * @example
     * ws.OnClose.Connect(() => {
     *     print("WebSocket closed");
     * });
     */
    readonly OnClose: RBXScriptSignal<() => void>;
}
