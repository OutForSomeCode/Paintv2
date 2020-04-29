import React from "react";
import attachDrag from "../functions/attachDrag";

class G extends React.Component<any, any> {
    componentDidMount(): void {
        attachDrag(this);
    }

    render() {
        return <g {...this.props}>
            {this.props.children}
        </g>;
    }
}

export {G}