import React, {CSSProperties} from "react";
import {Ellipse} from "../components/Ellipse";
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";

class Circle implements IShape {
    draw(index: number, CenterPos: Vector2, size: Vector2, style: CSSProperties, inGroup: boolean){
        let crossSection = (size.x + size.y) / 4;
        return <Ellipse
            key={index}
            id={index}
            cx={CenterPos.x}
            cy={CenterPos.y}
            rx={crossSection}
            ry={crossSection}
            style={style}
            ingroup={inGroup}
        />;
    }

    getType(): string {
        return "Circle";
    }
}

export {Circle}