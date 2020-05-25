import React, {CSSProperties} from "react";
import {Ellipse} from "../components/Ellipse";
import {IShape} from "./IShape";
import {BBox} from "../utility/BBox";

class Circle implements IShape {
    draw(index: number, bbox: BBox, style: CSSProperties, inGroup: boolean, callback: () => void) {
        let crossSection = (bbox.width + bbox.height) / 4;
        return <Ellipse
            key={index}
            id={index}
            cx={bbox.cx}
            cy={bbox.cy}
            rx={crossSection}
            ry={crossSection}
            style={style}
            ingroup={inGroup}
            update={callback}
        />;
    }

    getType(): string {
        return "Circle";
    }
}

export {Circle}