import React, {CSSProperties} from "react";
import {Ellipse} from "../components/Ellipse";
import {IShape} from "./IShape";
import {Vector2} from "../utility/Vector2";

class Elliptic implements IShape {
    draw(index: number, CenterPos: Vector2, size: Vector2, style: CSSProperties, inGroup: boolean, callback: () => void) {
        return <Ellipse
            key={index}
            id={index}
            cx={CenterPos.x}
            cy={CenterPos.y}
            rx={size.x / 2}
            ry={size.y / 2}
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