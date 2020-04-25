import React from "react";
import {makeDraggable} from "../functions/makeDraggable";

class Rect extends React.Component<any, any> {
    componentDidMount(): void {
        makeDraggable(this);
    }

    render() {
        return <rect {...this.props}/>;
    }
}

export {Rect}