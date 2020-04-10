import React from "react";

class Square {
    posX: number;
    posY: number;
    size: number = 100;

    constructor(x: number, y: number, s: number) {
        this.posX = x;
        this.posY = y;
        this.size = s;
    }

    draw() {
        return (<rect x={this.posX} y={this.posY} width={this.size} height={this.size}/>);
    }
}

export {Square}