import React from "react";

class Square implements IShape{
    Draw(xCenterPos: number, yCenterPos: number, width: number, height: number, style: string[]): any {
        let offsetX = width / 2;
        let offsetY = height / 2;
        let size = (width + height) / 2;
        return(<rect x={xCenterPos - offsetX} y={yCenterPos - offsetY} width={size} height={size}/>);
    }
}

export {Square}