import React from "react";

class G extends React.Component<any, any> {
    componentDidMount(): void {

    }

    render() {
        return <g {...this.props}>
            {this.props.children}
        </g>;
    }
}

export {G}