import React from "react";
import {makeDraggable} from "../functions/makeDraggable";

class Group extends React.Component {
    componentDidMount(): void {
        makeDraggable(this);
    }

    render() {
        return <g {...this.props}/>;
    }
}

export {Group}