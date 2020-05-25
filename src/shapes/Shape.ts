import {CSSProperties} from 'react'
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";
import {BBox} from "../utility/BBox";
import {Elliptic} from "./Elliptic";
import {Rectangle} from "./Ractangle";

const uuid = require('react-uuid');

/**
 * baseclass for shapes containing shape data
 */
class Shape implements IShapeGroup {
    private readonly _uuid: any = null;
    private _strategy: IShape;
    private _bbox: BBox;
    private _styling: CSSProperties;

    /**
     * allows for switching shapes without having to change te data
     * @param strategy: shape strategy (tells how to draw the given shape)
     * @param cx: center X position
     * @param cy: center Y position
     * @param w: width
     * @param h: height
     * @param s: style (border, shape color)
     */
    constructor(strategy: IShape, cx: number, cy: number, w: number, h: number, s: CSSProperties) {
        this._strategy = strategy;
        this._styling = s;
        this._uuid = uuid();
        this._bbox = new BBox(cy - (h / 2), cy + (h / 2), cx - (w / 2), cx + (w / 2));
    }

    /**
     * draw the given shape (returns html <element>)
     * @param inGroup: bool to check if its in a group
     * @param callback: callback to the update function in index.tsx
     */
    draw = (inGroup: boolean, callback: any) => {
        return this._strategy.draw(this._uuid, this._bbox, this._styling, inGroup, callback);
    }

    /**
     * change shape strategy
     * @param strategy: shape strategy (tells how to draw the given shape)
     */
    changeStrategy(strategy: IShape) {
        this._strategy = strategy;
    }

    /**
     * update the shape position by adding x, y
     * @param translation: the amount the shape needs to be moved
     */
    updatePosition = (translation: Vector2) => {
        this._bbox.updatePosition(translation);
    }

    /**
     * updates the positional data when resizing, strategies are updated to allow for stretching
     * @param scale: x, y scaling factor
     * @param bbox: bounding box (contains all positional data)
     */
    updateSize(scale: Vector2, bbox: any): void {
        this._bbox = bbox;

        if (this._strategy.getType() === "Circle") this.changeStrategy(new Elliptic());
        if (this._strategy.getType() === "Square") this.changeStrategy(new Rectangle());
    }

    /**
     * returns the data from this shape
     */
    public getObjectData(): any {
        return {
            id: this._uuid,
            bbox: this._bbox,
            style: this._styling,
            strategy: this._strategy
        };
    }

    /**
     * visitor pattern, used for saving all data
     * @param v: visitor
     */
    acceptVisitor(v: IVisitor): void {
        v.visitShape(this);
    }
}

export {Shape}