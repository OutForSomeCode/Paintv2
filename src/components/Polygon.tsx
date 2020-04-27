import React from "react";
import {findDOMNode} from "react-dom";
import {Commands} from "../controls/Commands";
import {UpdateShapePosition} from "../controls/UpdateShapePosition";
const d3 = require("d3");

class Polygon extends React.Component<any, any> {
    componentDidMount(): void {
        const shape = this.props;
        const shapeID = shape.id.toString();
        d3.select(findDOMNode(this)).call(drag());

        function drag() {
            const commands = Commands.getCommands();
            let test: number[] = shape.points;
            let width = test[2] - test[0];
            let height = test[5] - test[1];
            let pos = {
                x: 0,
                y: 0
            }

            function dragStarted() {
                // @ts-ignore
                d3.select(this).raise().style("stroke", "#65aae6");
            }

            function dragging() {
                pos.x = d3.event.x;
                pos.y = d3.event.y;

                let plb = [pos.x + (width / 2), pos.y + (height / 2)];
                let prb = [pos.x - (width / 2), pos.y + (height / 2)];
                let ptm = [pos.x, pos.y - (height / 2)];
                let t = [plb, prb, ptm];

                // @ts-ignore
                d3.select(this).attr("points", t.toString());
            }

            function dragEnded() {
                commands.push(new UpdateShapePosition(shapeID, pos.x + width / 2, pos.y + height / 2));

                // @ts-ignore
                d3.select(this).style("stroke", "#000000");
            }

            return d3.drag()
                .subject(function () {return pos})
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded);
        }
    }
    render() {
        return <polygon {...this.props}/>;
    }
}

export {Polygon}