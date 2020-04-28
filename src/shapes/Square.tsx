import React, {CSSProperties} from "react";
import {Rect} from "../components/Rect";
import {IShape} from "./IShape";

class Square implements IShape{
    draw(index:number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        let crossSection = (width + height) / 2;
        let offsetX = crossSection / 2;
        let offsetY = crossSection / 2;
        // @ts-ignore
        return <Rect key={index} id={index} x={xCenterPos - offsetX} y={yCenterPos - offsetY} width={crossSection} height={crossSection} style={style}/>;
    }
}
export {Square}