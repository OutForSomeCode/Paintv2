import React, {CSSProperties} from "react";
import {Polygon} from "../components/Polygon";
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";

class Triangle implements IShape {
    draw(index: number, CenterPos: Vector2, size: Vector2, style: CSSProperties) {
        let plb = [CenterPos.x + (size.x / 2), CenterPos.y + (size.y / 2)];
        let prb = [CenterPos.x - (size.x / 2), CenterPos.y + (size.y / 2)];
        let ptm = [CenterPos.x, CenterPos.y - (size.y / 2)];
        let t = [plb, prb, ptm];
        return (<Polygon key={index} id={index} points={t.toString()} cx={CenterPos.x} cy={CenterPos.y} width={size.x}
                         height={size.y} style={style}/>);
    }

    getType(): string {
        return "Triangle";
    }
}

export {Triangle}