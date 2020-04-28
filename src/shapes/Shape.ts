import {CSSProperties} from 'react'
import {IShape} from "./IShape";

const uuid = require('react-uuid');

class Shape {
    public uuid: any = null;

    private strategy: IShape;
    private cenPosX: number;
    private cenPosY: number;
    private width: number;
    private height: number;
    private styling: CSSProperties;

    constructor(strategy: IShape, cx: number, cy: number, w: number, h: number, s: CSSProperties) {
        this.strategy = strategy;
        this.cenPosX = cx;
        this.cenPosY = cy;
        this.width = w;
        this.height = h;
        this.styling = s;
        this.uuid = uuid();
    }

    public draw = () => {
        return this.strategy.draw(this.uuid, this.cenPosX, this.cenPosY, this.width, this.height, this.styling);
    }

    public updatePosition = (x: number, y: number) => {
        this.cenPosX = x;
        this.cenPosY = y;
    }

    public getPosition(): number[]{
        return [this.cenPosX, this.cenPosY];
    }
}

export {Shape}

