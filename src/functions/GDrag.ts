import {Commands} from "../controls/Commands";
import React from "react";
import {findDOMNode} from "react-dom";
import {Vector2} from "../utility/Vector2";
import {UpdateGroupPosition} from "../controls/UpdateGroupPosition";

const d3 = require("d3");

export default function GDrag(comp: React.Component) {
    const node: any = findDOMNode(comp);
    const commands = Commands.getInstance();
    let position = new Vector2(0,0);

    function startDragging() {
        // @ts-ignore
        d3.select(this).raise().style("stroke", "#65aae6");
    }

    function dragging() {
        const transform = `translate(${d3.event.x}, ${d3.event.y})`;
        position.x = d3.event.x;
        position.y = d3.event.y;

        // @ts-ignore
        d3.select(this).attr('transform', transform);
    }

    function endDragging() {
        let bBox = node.getBBox();
        commands.push(new UpdateGroupPosition(node.id, bBox, position));
        // @ts-ignore
        d3.select(this).style("stroke", "#000000").attr('transform', null);
        // update trigger needed!!!
    }

    const attach = d3.drag()
        .subject(function () {
            return position
        })
        .on("start", startDragging)
        .on("drag", dragging)
        .on("end", endDragging);

    attach(d3.select(node));
}