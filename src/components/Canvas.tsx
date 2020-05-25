import React from "react";
import {CommandCreateShape} from "../Commands/CommandCreateShape";
import {Shape} from "../shapes/Shape";
import {SharedShapeData} from "../shapes/SharedShapeData";
import {Commands} from "../Commands/Commands";
import SelectDrag from "../functions/Select";

const d3 = require("d3");

class Canvas extends React.Component<any, any> {
    private _svgCanvas = React.createRef<SVGSVGElement>();
    private _commandInstance = Commands.getInstance();
    private _update = this.props.shapeUpdate;

    componentDidMount(): void {
        SelectDrag(this, this._update);
    }

    addShape = (event: { clientX: number; clientY: number; }): any => {
        d3.select("#contextMenu").style('display', 'none');

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