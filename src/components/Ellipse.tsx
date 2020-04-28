import React from "react";
import {Commands} from "../controls/Commands";
import {UpdateItemPosition} from "../controls/UpdateItemPosition";
import {findDOMNode} from "react-dom";
import {Vector2} from "../utility/Vector2";

const d3 = require("d3");

class Ellipse extends React.Component<any, any> {
    componentDidMount(): void {
        //const shape = this.props;
        const shapeID = this.props.id.toString();
        d3.select(findDOMNode(this)).call(attachDrag(shapeID));

        // function drag() {
        //     const commands = Commands.getInstance();
        //     let pos = {
        //         x: shape.cx,
        //         y: shape.cy
        //     }
        //
        //     function dragStarted() {
        //         // @ts-ignore
        //         d3.select(this).raise().style("stroke", "#65aae6");
        //         console.log(shape);
        //     }
        //
        //     function dragging() {
        //         pos.x = d3.event.x;
        //         pos.y = d3.event.y;
        //
        //         // @ts-ignore
        //         d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
        //     }
        //
        //     function dragEnded() {
        //         commands.push(new UpdateItemPosition(shapeID, pos.x, pos.y));
        //
        //         // @ts-ignore
        //         d3.select(this).style("stroke", "#000000");
        //     }
        //
        //     return d3.drag()
        //         .subject(function () {return pos})
        //         .on("start", dragStarted)
        //         .on("drag", dragging)
        //         .on("end", dragEnded);
        // }
    }

    render() {
        return <ellipse {...this.props}/>;
    }
}

export {Ellipse}

