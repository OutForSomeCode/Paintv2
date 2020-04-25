import {IShape} from "./IShape";
import {Elliptic} from "./Elliptic";
import {CSSProperties} from "react";

class SharedShapeData {
    static type: IShape = new Elliptic();
    static height: number = 50;
    static width: number = 50;
    static styling: CSSProperties = {
        stroke: "black",
        fill: "#cccccc"
    }
}
export {SharedShapeData}