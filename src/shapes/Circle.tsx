import React, {CSSProperties} from "react";

class Circle implements IShape {
    Draw(xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        let radius = (width + height) / 4;
        return (<circle className="draggable" cx={xCenterPos} cy={yCenterPos} r={radius} style={style}/>);
    }
}

export {Circle}

