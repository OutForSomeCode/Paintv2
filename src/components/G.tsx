import React from "react";
import GDrag from "../functions/GDrag";

class G extends React.Component<any, any> {
    private _update = this.props.shapeUpdate;
    componentDidMount(): void {
        this.enableDragging(this.props.ingroup);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        this.enableDragging(this.props.ingroup);
        this._update();
    }

    enableDragging(inGroup: boolean) {
        if (inGroup)
            return;
        GDrag(this);
    }

    render() {
        return <g {...this.props}>
            {this.props.children}
        </g>;
    }
}

export {G}