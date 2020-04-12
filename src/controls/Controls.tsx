import React from "react";
import {Circle} from "../shapes/Circle";
import ShapeSelect from "./ShapeSelect";

class Controls extends React.Component {
    static type: IShape = new Circle();

    render() {
        return (
            <div id="controls">
                <ShapeSelect/>
            </div>
        );
    }
}
export {Controls}