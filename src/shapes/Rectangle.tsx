import React, {CSSProperties} from "react";
import {Rect} from "../Components/Rect";

class Rectangle implements IShape {
    Draw(xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        let offsetX = width / 2;
        let offsetY = height / 2;
        // @ts-ignore
        return (<Rect x={xCenterPos - offsetX} y={yCenterPos - offsetY} width={width} height={height} style={style}/>);
    }
}

export {Rectangle}