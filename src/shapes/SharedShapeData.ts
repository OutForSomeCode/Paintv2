import {IShape} from "./IShape";
import {Circle} from "./Circle";
import {CSSProperties} from "react";

class SharedShapeData {
    static type: IShape = new Circle();
    static height: number = 50;
    static width: number = 50;
    static styling: CSSProperties = {
        stroke: "black",
        fill: "#cccccc"
    }
}
export {SharedShapeData}