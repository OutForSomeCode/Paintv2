import {findDOMNode} from "react-dom";
import {Commands} from "../controls/Commands";
import {UpdateItemPosition} from "../controls/UpdateItemPosition";
import {Vector2} from "../utility/Vector2";
import React from "react";

const d3 = require("d3");

export default function EllipseDrag(comp: React.Component) {
    const node: any = findDOMNode(comp);
    const commands = Commands.getInstance();
    let pos = new Vector2(node.cx.baseVal.value, node.cy.baseVal.value);

    function dragStarted() {
        // @ts-ignore
        d3.select(this).raise().style("stroke", "#65aae6");
    }

    function dragging() {
        pos.x = d3.event.x;
        pos.y = d3.event.y;

        // @ts-ignore
        d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
    }

    function dragEnded() {
        commands.push(new UpdateItemPosition(node.id, pos));

        // @ts-ignore
        d3.select(this).style("stroke", "#000000");
    }

    const attach = d3.drag()
        .subject(function () {
            return pos
        })
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded);

    attach(d3.select(node));
}