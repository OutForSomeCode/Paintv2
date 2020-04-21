import React from "react";
import {makeDraggable} from "../functions/makeDraggable";

class Polygon extends React.Component {
    componentDidMount(): void {
        makeDraggable(this);
    }
    render() {
        return <polygon {...this.props}/>;
    }
}

export {Polygon}