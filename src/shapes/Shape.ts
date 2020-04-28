import {CSSProperties} from 'react'
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";

const uuid = require('react-uuid');

class Shape {
    public uuid: any = null;

    private strategy: IShape;
    private cenPos: Vector2;
    private _size: Vector2;
    private styling: CSSProperties;

    constructor(strategy: IShape, cx: number, cy: number, w: number, h: number, s: CSSProperties) {
        this.strategy = strategy;
        this.cenPos = new Vector2(cx, cy);
        this._size = new Vector2(w, h);
        this.styling = s;
        this.uuid = uuid();
    }

    public draw = () => {
        return this.strategy.draw(this.uuid, this.cenPos, this._size, this.styling);
    }

    public updatePosition = (p: Vector2) => {
        this.cenPos = p;
    }

    public getPosition(): Vector2{
        return this.cenPos;
    }

    getType() {
        return this.strategy.getType();
    }

    getsize(): Vector2 {
        return this._size;
    }
}

export {Shape}

