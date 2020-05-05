import React from "react";
import {CommandCreateShape} from "../controls/CommandCreateShape";
import {Shape} from "../shapes/Shape";
import {SharedShapeData} from "../shapes/SharedShapeData";
import {Commands} from "../controls/Commands";
import SelectDrag from "../functions/Select";

class Canvas extends React.Component<any, any> {
    private _svgCanvas = React.createRef<SVGSVGElement>();
    private _commandInstance = Commands.getInstance();
    private _update = this.props.shapeUpdate;

    componentDidMount(): void {
        SelectDrag(this);
    }

    addShape = (event: { clientX: number; clientY: number; }): any => {
        let offset = this._svgCanvas.current!.getBoundingClientRect();
        this._commandInstance.push(
            new CommandCreateShape(
                new Shape(
                    SharedShapeData.type,
                    event.clientX - offset.left,
                    event.clientY - offset.top,
                    SharedShapeData.width,
                    SharedShapeData.height,
                    SharedShapeData.styling
                )
            )
        );
        this._update();
    }

    render() {
        return <svg id="canvas" className="fullSize" ref={this._svgCanvas} onClick={this.addShape}>
            {this.props.children}
        </svg>;
    }
}

export {Canvas}