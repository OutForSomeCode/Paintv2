import {CSSProperties} from 'react'
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";

const uuid = require('react-uuid');

class Shape implements IShapeGroup {
    private readonly _uuid: any = null;
    private _strategy: IShape;
    private _cenPos: Vector2;
    private _size: Vector2;
    private _styling: CSSProperties;

    constructor(strategy: IShape, cx: number, cy: number, w: number, h: number, s: CSSProperties) {
        this._strategy = strategy;
        this._cenPos = new Vector2(cx, cy);
        this._size = new Vector2(w, h);
        this._styling = s;
        this._uuid = uuid();
    }

    public draw = (inGroup: boolean, callback: any) => {
        return this._strategy.draw(this._uuid, this._cenPos, this._size, this._styling, inGroup, callback);
    }

    public updatePosition = (translation: Vector2) => {
        this._cenPos.x += translation.x;
        this._cenPos.y += translation.y;
    }

    public getObjectData(): any{
        return {
            id: this._uuid,
            pos: this._cenPos,
            size: this._size,
            style: this._styling,
            strategy: this._strategy.getType()
        };
    }

    acceptVisitor(v: IVisitor): void {
        v.visitShape(this);
    }
}

export {Shape}