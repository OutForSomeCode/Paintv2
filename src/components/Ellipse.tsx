import React from "react";
import {Commands} from "../controls/Commands";
import {UpdateShapePosition} from "../controls/UpdateShapePosition";
import {findDOMNode} from "react-dom";
const d3 = require("d3");

class Ellipse extends React.Component<any, any> {
    componentDidMount(): void {
        const shapeID = this.props.id.toString();
        d3.select(findDOMNode(this)).call(drag());

        function drag() {
            const commands = Commands.getCommands();
            let x: number;
            let y: number;

            function dragStarted() {
                // @ts-ignore
                d3.select(this).raise().style("stroke", "#65aae6");
            }

            function dragging() {
                x = d3.event.x;
                y = d3.event.y;

                // @ts-ignore
                d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
            }

            function dragEnded() {
                commands.push(new UpdateShapePosition(shapeID, x, y));

                // @ts-ignore
                d3.select(this).style("stroke", "#000000");
            }

            return d3.drag()
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded);
        }
    }

    render() {
        return <ellipse {...this.props}/>;
    }
}

export {Ellipse}

