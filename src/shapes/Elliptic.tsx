import React, {CSSProperties} from "react";
import {Ellipse} from "../components/Ellipse";
import {IShape} from "./IShape";
import {BBox} from "../utility/BBox";

class Elliptic implements IShape {
    draw(index: number, bbox: BBox, style: CSSProperties, inGroup: boolean, callback: () => void) {
        return <Ellipse
            key={index}
            id={index}
            cx={bbox.cx}
            cy={bbox.cy}
            rx={bbox.width / 2}
            ry={bbox.height / 2}
            style={style}
            ingroup={inGroup}
            update={callback}
        />;
    }

    getType(): string {
        return "Elliptic";
    }
}

export {Elliptic}