import React, {CSSProperties} from "react";
import {Rect} from "../components/Rect";
import {IShape} from "./IShape";
import {BBox} from "../utility/BBox";

/**
 * square strategy
 */
class Square implements IShape{
    draw(index:number, bbox: BBox, style: CSSProperties, inGroup: boolean, callback: () => void) {
        let crossSection = (bbox.width + bbox.height) / 2;
        return <Rect
            key={index}
            id={index}
            x={bbox.x}
            y={bbox.y}
            width={crossSection}
            height={crossSection}
            style={style}
            ingroup={inGroup}
            update={callback}
        />;
    }

    getType(): string {
        return "Square";
    }
}
export {Square}