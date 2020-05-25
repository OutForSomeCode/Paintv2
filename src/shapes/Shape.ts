import {CSSProperties} from 'react'
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";
import {BBox} from "../utility/BBox";
import {Elliptic} from "./Elliptic";
import {Rectangle} from "./Ractangle";

const uuid = require('react-uuid');

class Shape implements IShapeGroup {
    private readonly _uuid: any = null;
    private _strategy: IShape;
    private _bbox: BBox;
    private _styling: CSSProperties;

    constructor(strategy: IShape, cx: number, cy: number, w: number, h: number, s: CSSProperties) {
        this._strategy = strategy;
        this._styling = s;
        this._uuid = uuid();
        this._bbox = new BBox(cy - (h / 2), cy + (h / 2), cx - (w / 2), cx + (w / 2));
    }

    draw = (inGroup: boolean, callback: any) => {
        return this._strategy.draw(this._uuid, this._bbox, this._styling, inGroup, callback);
    }

    changeStrategy(strategy: IShape) {
        this._strategy = strategy;
    }

    updatePosition = (translation: Vector2) => {
        this._bbox.updatePosition(translation);
    }

    updateSize(scale: Vector2, bbox: any): void {
        this._bbox = bbox;

        if (this._strategy.getType() === "Circle") this.changeStrategy(new Elliptic());
        if (this._strategy.getType() === "Square") this.changeStrategy(new Rectangle());
    }

    public getObjectData(): any {
        return {
            id: this._uuid,
            bbox: this._bbox,
            style: this._styling,
            strategy: this._strategy
        };
    }

    acceptVisitor(v: IVisitor): void {
        v.visitShape(this);
    }
}

export {Shape}