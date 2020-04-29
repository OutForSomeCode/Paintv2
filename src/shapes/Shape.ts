import {CSSProperties} from 'react'
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";

const uuid = require('react-uuid');

class Shape implements IShapeGroup {
    private readonly _uuid: any = null;
    private strategy: IShape;
    private cenPos: Vector2;
    private _size: Vector2;
    private styling: CSSProperties;

    constructor(strategy: IShape, cx: number, cy: number, w: number, h: number, s: CSSProperties) {
        this.strategy = strategy;
        this.cenPos = new Vector2(cx, cy);
        this._size = new Vector2(w, h);
        this.styling = s;
        this._uuid = uuid();
    }

    public draw = (inGroup: boolean) => {
        return this.strategy.draw(this._uuid, this.cenPos, this._size, this.styling, inGroup);
    }

    // visitor specific?
    public updatePosition = (p: Vector2) => {
        this.cenPos = p;
    }

    public getObjectData(): any{
        return {
            id: this._uuid,
            pos: this.cenPos,
            size: this._size,
            style: this.styling,
            strategy: this.strategy.getType()
        };
    }

    acceptVisitor(v: IVisitor): void {
        v.visitShape(this);
    }
}

export {Shape}