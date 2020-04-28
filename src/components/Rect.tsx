import React from "react";
import {findDOMNode} from "react-dom";
import {Commands} from "../controls/Commands";
import {UpdateShapePosition} from "../controls/UpdateShapePosition";
import {Vector2} from "../utility/Vector2";

const d3 = require("d3");

class Rect extends React.Component<any, any> {
    componentDidMount(): void {
        const shape = this.props;
        const shapeID = shape.id.toString();
        d3.select(findDOMNode(this)).call(drag());

        function drag() {
            const commands = Commands.getCommands();
            let pos = new Vector2(shape.cx, shape.cy);

            function dragStarted() {
                // @ts-ignore
                d3.select(this).raise().style("stroke", "#65aae6");
            }

            function dragging() {
                pos.x = d3.event.x;
                pos.y = d3.event.y;

                // @ts-ignore
                d3.select(this).attr("x", d3.event.x).attr("y", d3.event.y);
            }

            function dragEnded() {
                commands.push(new UpdateShapePosition(shapeID,
                    new Vector2(pos.x + shape.width / 2, pos.y + shape.height / 2)
                ));

                // @ts-ignore
                d3.select(this).style("stroke", "#000000");
            }

            return d3.drag()
                .subject(function () {
                    return pos
                })
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded);
        }
    }

    render() {
        return <rect {...this.props}/>;
    }
}

export {Rect}