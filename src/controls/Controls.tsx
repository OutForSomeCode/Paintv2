import React from "react";
import {Circle} from "../shapes/Circle";
import ToggleShape from "./ToggleShape";

class Controls extends React.Component {
    static type: IShape = new Circle();

    render() {
        return (
            <div id="controls">
                <ToggleShape/>
            </div>
        );
    }
}
export {Controls}