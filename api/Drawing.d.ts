// api/Drawing.d.ts

declare namespace Drawing {
    /** The available font types for Text drawings */
    export const Fonts: {
        readonly UI: 0;
        readonly System: 1;
        readonly Plex: 2;
        readonly Monospace: 3;
    };

    export type Font = (typeof Fonts)[keyof typeof Fonts];

    /**
     * Creates a new Drawing object of the specified type.
     * @param type The type of drawing to create.
     */
    export function new<T extends Drawing>(type: DrawingType): T;
}

/**
 * Base class for all Drawing objects.
 * Cannot be instantiated directly.
 */
declare class BaseDrawing {
    /** Whether the drawing is visible */
    Visible: boolean;

    /** Render order (higher = on top) */
    ZIndex: number;

    /** Transparency (0 = transparent, 1 = opaque) */
    Transparency: number;

    /** Color of the drawing */
    Color: Color3;

    /** Destroys the drawing object */
    Destroy(): void;
}

// Drawing Types
type DrawingType = 'Line' | 'Text' | 'Image' | 'Circle' | 'Square' | 'Quad' | 'Triangle';

// Individual Drawing Classes
declare class Line extends BaseDrawing {
    From: Vector2;
    To: Vector2;
    Thickness: number;
}

declare class Text extends BaseDrawing {
    Text: string;
    readonly TextBounds: Vector2;
    Font: Drawing.Font;
    Size: number;
    Position: Vector2;
    Center: boolean;
    Outline: boolean;
    OutlineColor: Color3;
}

declare class Image extends BaseDrawing {
    Data: string;         // Raw image data (e.g. encoded PNG)
    Size: Vector2;
    Position: Vector2;
    Rounding: number;     // Corner rounding (0 = sharp, higher = rounded)
}

declare class Circle extends BaseDrawing {
    NumSides: number;     // More sides = smoother circle
    Radius: number;
    Position: Vector2;
    Thickness: number;    // Only used if Filled = false
    Filled: boolean;
}

declare class Square extends BaseDrawing {
    Size: Vector2;
    Position: Vector2;
    Thickness: number;
    Filled: boolean;
}

declare class Quad extends BaseDrawing {
    PointA: Vector2;
    PointB: Vector2;
    PointC: Vector2;
    PointD: Vector2;
    Thickness: number;
    Filled: boolean;
}

declare class Triangle extends BaseDrawing {
    PointA: Vector2;
    PointB: Vector2;
    PointC: Vector2;
    Thickness: number;
    Filled: boolean;
}

// Global Functions (executor globals)
/**
 * Destroys all drawing objects.
 */
declare function cleardrawcache(): void;

/**
 * Gets a property from a drawing object.
 * Equivalent to `drawing[property]`
 */
declare function getrenderproperty<T extends keyof BaseDrawing>(
    drawing: BaseDrawing,
    property: T
): BaseDrawing[T];

/**
 * Sets a property on a drawing object.
 * Equivalent to `drawing[property] = value`
 */
declare function setrenderproperty<T extends keyof BaseDrawing>(
    drawing: BaseDrawing,
    property: T,
    value: BaseDrawing[T]
): void;

/**
 * Checks if the object is a valid Drawing.
 */
declare function isrenderobj(object: unknown): boolean;
