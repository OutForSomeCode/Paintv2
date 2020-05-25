import {IShape} from "../shapes/IShape";
import {BBox} from "../utility/BBox";

class Decorator implements IShape {
    private _shape: IShape;

    constructor(shape: IShape) {
        this._shape = shape;
    }

    draw(index: number, bbox: BBox, style: any, inGroup: boolean, callback: () => void): any {
        return this._shape.draw(index, bbox, style, inGroup, callback);
    }

    getType(): string {
        return this._shape.getType();
    }
}

export {Decorator}