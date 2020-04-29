import React, {CSSProperties} from "react";
import {Rect} from "../components/Rect";
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";

class Square implements IShape{
    draw(index:number, CenterPos: Vector2, size : Vector2, style: CSSProperties, inGroup: boolean) {
        let crossSection = (size.x + size.y) / 2;
        let offsetX = crossSection / 2;
        let offsetY = crossSection / 2;
        return <Rect
            key={index}
            id={index}
            x={CenterPos.x - offsetX}
            y={CenterPos.y - offsetY}
            width={crossSection}
            height={crossSection}
            style={style}
            ingroup={inGroup}/>;
    }

    getType(): string {
        return "Square";
    }
}
export {Square}