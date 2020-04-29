import React from "react";
import PolygonDrag from "../functions/PolygonDrag";

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
        PolygonDrag(this);
    }

    render() {
        return <polygon {...this.props}/>;
    }
}

export {Polygon}