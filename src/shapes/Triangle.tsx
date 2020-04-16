import React from "react";

class Triangle implements IShape {
    Draw(id: number, xCenterPos: number, yCenterPos: number, width: number, height: number, style: any): any {
        let plb = [xCenterPos + (width / 2), yCenterPos + (height / 2)];
        let prb = [xCenterPos - (width / 2), yCenterPos + (height / 2)];
        let ptm = [xCenterPos, yCenterPos - (height / 2)];
        let t = [plb, prb, ptm];

        return (<polygon key={id + ""} points={t.toString()} style={style}/>);
    }
}

export {Triangle}