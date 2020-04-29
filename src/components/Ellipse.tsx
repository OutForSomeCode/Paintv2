import React from "react";
import EllipseDrag from "../functions/EllipseDrag";

class Ellipse extends React.Component<any, any> {
    componentDidMount(): void {
        this.enableDragging(this.props.ingroup);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        this.enableDragging(this.props.ingroup);
    }

    enableDragging(inGroup: boolean){
        if (inGroup)
            return;
        EllipseDrag(this);
    }

    render() {
        return <ellipse {...this.props}/>;
    }
}

export {Ellipse}

