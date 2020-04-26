import {CSSProperties} from 'react'
import {IShape} from "./IShape";

const uuid = require('react-uuid');

class Shape {
    public uuid: any = null;

    private strategy: IShape;
    private posX: number;
    private posY: number;
    private width: number;
    private height: number;
    private styling: CSSProperties;

    constructor(strategy: IShape, x: number, y: number, w: number, h: number, s: CSSProperties) {
        this.strategy = strategy;
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.styling = s;
        this.uuid = uuid();
    }

    public draw = () => {
        return this.strategy.draw(this.uuid, this.posX, this.posY, this.width, this.height, this.styling);
    }

    public updatePosition = (x: number, y: number) => {
        this.posX += x;
        this.posY += y;
    }
}

export {Shape}

