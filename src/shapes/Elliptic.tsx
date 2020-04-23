import React, {CSSProperties} from "react";
import {Circle} from "../components/Circle";

class Elliptic implements IShape{
    draw(index: number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        const radius = (width + height) / 4;
        // @ts-ignore
        return <Circle key={index} id={index} cx={xCenterPos} cy={yCenterPos} r={radius} style={style}/>;
    }
}

export {Elliptic}