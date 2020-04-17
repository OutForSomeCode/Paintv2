import React, {CSSProperties} from "react";

class Circle implements IShape {
    Draw(id: number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: CSSProperties): any {
        let radius = (width + height) / 4;
        return (<circle className="draggable" key={id + ""} cx={xCenterPos} cy={yCenterPos} r={radius} style={style}/>);
    }
}

export {Circle}

