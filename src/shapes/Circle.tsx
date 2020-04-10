import React from "react";

class Circle {
    posX: number;
    posY: number;
    radius: number;

    constructor(x: number, y: number, r: number) {
        this.posX = x;
        this.posY = y;
        this.radius = r;
    }

    draw() {
        return (<circle cx={this.posX} cy={this.posY} r={this.radius} />);
    }
}

export {Circle}

