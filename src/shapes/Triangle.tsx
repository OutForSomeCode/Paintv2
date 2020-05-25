import React, {CSSProperties} from "react";
import {Polygon} from "../components/Polygon";
import {IShape} from "./IShape";
import {BBox} from "../utility/BBox";

/**
 * triangle strategy
 */
class Triangle implements IShape {
    draw(index: number, bbox: BBox, style: CSSProperties, inGroup: boolean, callback: () => void) {
        let plb = [bbox.left, bbox.bottom];
        let prb = [bbox.right, bbox.bottom];
        let ptm = [bbox.cx, bbox.top];
        let t = [plb, prb, ptm];
        return <Polygon
            key={index}
            id={index}
            points={t.toString()}
            cx={bbox.cx}
            cy={bbox.cy}
            width={bbox.width}
            height={bbox.height}
            style={style}
            ingroup={inGroup}
            update={callback}
        />;
    }

    getType(): string {
        return "Triangle";
    }
}

export {Triangle}