import {CSSProperties} from "react";

class Shape {
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
    }

    public executeStrategy(i: number) {
        return this.strategy.Draw(i, this.posX, this.posY, this.width, this.height, this.styling);
    }
}

export {Shape}

