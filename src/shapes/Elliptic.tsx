import React, {CSSProperties} from "react";
import {Circle} from "../Components/Circle";

class Elliptic implements IShape{
    Draw(xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        const radius = (width + height) / 4;
        // @ts-ignore
        return <Circle cx={xCenterPos} cy={yCenterPos} r={radius} style={style}/>;
    }
}

export {Elliptic}