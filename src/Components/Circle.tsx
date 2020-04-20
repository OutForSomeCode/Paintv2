import React from "react";
import {makeDraggable} from "../controls/makeDraggable";

class Circle extends React.Component {
    componentDidMount(): void {
        makeDraggable(this);
    }
    render() {
        return <circle {...this.props} />;
    }
}

export {Circle}

