import React from "react";
import {Polygon} from "../components/Polygon";
import {IShape} from "./IShape";

class Triangle implements IShape {
    draw(index: number, cenPosX: number, cenPosY: number, width: number, height: number, style: any): any {
        let plb = [cenPosX + (width / 2), cenPosY + (height / 2)];
        let prb = [cenPosX - (width / 2), cenPosY + (height / 2)];
        let ptm = [cenPosX, cenPosY - (height / 2)];
        let t = [plb, prb, ptm];
        // @ts-ignore
        return (<Polygon key={index} id={index} points={t.toString()} cx={cenPosX} cy={cenPosY} width={width} height={height} style={style}/>);
    }
}

export {Triangle}