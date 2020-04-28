import React, {CSSProperties} from "react";
import {Rect} from "../components/Rect";
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";

class Rectangle implements IShape {
    draw(index: number, CenterPos: Vector2,  size: Vector2, style: CSSProperties){
        let offsetX = size.x / 2;
        let offsetY = size.y / 2;
        return <Rect key={index} id={index} x={CenterPos.x - offsetX} y={CenterPos.y - offsetY} width={size.x} height={size.y} style={style}/>;
    }

    getType(): string {
        return "Rectangle";
    }
}

export {Rectangle}