import React from "react";
import AttachDrag from "../functions/AttachDrag";

class Polygon extends React.Component<any, any> {
    componentDidMount(): void {
        this.enableDragging(this.props.ingroup);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        this.enableDragging(this.props.ingroup);
    }

    enableDragging(inGroup: boolean){
        if (inGroup)
            return;
        AttachDrag(this, this.props.update);
    }

    render() {
        return <polygon {...this.props}/>;
    }
}

export {Polygon}