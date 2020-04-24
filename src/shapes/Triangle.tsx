import React from "react";
import {Polygon} from "../components/Polygon";
import {IShape} from "./IShape";

class Triangle implements IShape {
    draw(index: number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: any): any {
        let plb = [xCenterPos + (width / 2), yCenterPos + (height / 2)];
        let prb = [xCenterPos - (width / 2), yCenterPos + (height / 2)];
        let ptm = [xCenterPos, yCenterPos - (height / 2)];
        let t = [plb, prb, ptm];
        // @ts-ignore
        return (<Polygon key={index} id={index} points={t.toString()} style={style}/>);
    }
}

export {Triangle}