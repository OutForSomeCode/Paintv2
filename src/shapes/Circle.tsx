import React from "react";

class Circle implements IShape{
    Draw(xCenterPos: number, yCenterPos: number, width: number, height: number, style: string[]): any {
        let radius = (width + height) / 4;
        // @ts-ignore
        return (<circle cx={xCenterPos} cy={yCenterPos} r={radius}/>);
    }
}

export {Circle}

