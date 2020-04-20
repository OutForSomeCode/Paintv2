import React from "react";
import {makeDraggable} from "../controls/makeDraggable";

class Rect extends React.Component {
    componentDidMount(): void {
        makeDraggable(this);
    }

    render() {
        return <rect {...this.props}/>;
    }
}

export {Rect}