import React, {CSSProperties} from "react";
import {Rect} from "../components/Rect";
import {IShape} from "./IShape";
import {BBox} from "../utility/BBox";

/**
 * rectangle strategy
 */
class Rectangle implements IShape {
    draw(index: number, bbox: BBox, style: CSSProperties, inGroup: boolean, callback: () => void) {
        return <Rect
            key={index}
            id={index}
            x={bbox.x}
            y={bbox.y}
            width={bbox.width}
            height={bbox.height}
            style={style}
            ingroup={inGroup}
            update={callback}
        />;
    }

    getType(): string {
        return "Rectangle";
    }
}

export {Rectangle}