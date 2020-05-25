import {IShape} from "./IShape";
import {Circle} from "./Circle";
import {CSSProperties} from "react";

/**
 * shared class that contains data needed for creating a shape
 */
class SharedShapeData {
    static type: IShape = new Circle();
    static height: number = 50;
    static width: number = 50;
    static context: string = "";
    static styling: CSSProperties = {
        stroke: "black",
        fill: "#cccccc"
    }
}
export {SharedShapeData}