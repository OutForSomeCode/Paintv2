import React, {CSSProperties} from "react";
import {Ellipse} from "../components/Ellipse";
import {IShape} from "./IShape";

class Elliptic implements IShape {
    draw(index: number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        // @ts-ignore
        return <Ellipse key={index} id={index} cx={xCenterPos} cy={yCenterPos} rx={width / 2} ry={height / 2} style={style}/>;
    }
}

export {Elliptic}