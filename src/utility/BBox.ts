import {Vector2} from "./Vector2";

class BBox {
    x: number;
    cx: number;
    y: number;
    cy: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;

    /**
     * bounding box
     * @param t: top Y coordinate
     * @param b: bottom Y coordinate
     * @param l: left X coordinate
     * @param r: right X coordinate
     */
    constructor(t: number, b: number, l: number, r: number) {
        this.x = l;
        this.cx = l + (r - l) / 2;
        this.y = t;
        this.cy = t + (b - t) / 2;
        this.top = t;
        this.bottom = b;
        this.left = l;
        this.right = r;
        this.height = b - t;
        this.width = r - l;
    }

    updatePosition(translation: Vector2) {
        this.cx += translation.x;
        this.cy += translation.y;
        this.x += translation.x;
        this.y += translation.y;
        this.left += translation.x;
        this.top += translation.y;
        this.right += translation.x;
        this.bottom += translation.y;
    }
}

export {BBox}