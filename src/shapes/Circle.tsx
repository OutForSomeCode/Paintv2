import React, {CSSProperties} from "react";
import {Ellipse} from "../components/Ellipse";
import {IShape} from "./IShape";

class Circle implements IShape {
    draw(index: number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        let crossSection = (width + height) / 4;
        // @ts-ignore
        return <Ellipse key={index} id={index} cx={xCenterPos} cy={yCenterPos} rx={crossSection} ry={crossSection} style={style}/>;
    }
}

export {Circle}