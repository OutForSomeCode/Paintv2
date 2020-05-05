import {Commands} from "../controls/Commands";
import React from "react";
import {findDOMNode} from "react-dom";
import {Vector2} from "../utility/Vector2";
import {CommandUpdatePosition} from "../controls/CommandUpdatePosition";
import selection from "./selection";

const d3 = require("d3");

export default function Drag(comp: React.Component, update: () => void) {
    const node: any = findDOMNode(comp);
    const commands = Commands.getInstance();
    let position = new Vector2(0, 0);

    function startDragging() {
        d3.selectAll(".selected").classed("selected", false);

        // @ts-ignore
        d3.select(this).raise().classed("selected", true);
    }

    function dragging() {
        const translate = `translate(${d3.event.x}, ${d3.event.y})`;
        position.x = d3.event.x;
        position.y = d3.event.y;

        // @ts-ignore
        d3.select(this).attr('transform', translate);
    }

    function endDragging() {
        if (position.x >= 1 || position.x <= -1 || position.y >= 1 || position.y <= -1) //prevent "empty" commands in the history que
            commands.push(new CommandUpdatePosition(node.id, position));
        // @ts-ignore
        d3.select(this).attr('transform', null);
        update();
        selection();
    }

    function preventClick() {
        d3.event.stopPropagation(); //prevent new shapes from being added when a shape is clicked
    }

    const attach = d3.drag()
        .subject(function () {
            return position
        })
        .on("start", startDragging)
        .on("drag", dragging)
        .on("end", endDragging);

    attach(d3.select(node));
    d3.select(node)
        .on("click", preventClick)
        .on("contextmenu", function () {
            // @ts-ignore
            if (d3.select(this).classed("selected")) {
                d3.event.preventDefault();
            }
        })
}