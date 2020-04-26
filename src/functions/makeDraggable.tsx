import React from "react";
import {findDOMNode} from "react-dom";
import {Commands} from "../controls/Commands";
import {UpdateShapePosition} from "../controls/UpdateShapePosition";

const d3 = require("d3");

function makeDraggable(comp: React.Component) {
    let translateX = 0;
    let translateY = 0;

    const node: any = findDOMNode(comp);
    const commands = Commands.getCommands()

    const handleDrag = d3.drag()
        .subject(function() {
            return { x: translateX, y: translateY }
        })
        .on('drag', function() {
            // @ts-ignore
            const me = d3.select(this);
            const transform = `translate(${d3.event.x}, ${d3.event.y})`;
            translateX = d3.event.x;
            translateY = d3.event.y;
            me.attr('transform', transform);
        }).on('end', function () {
            commands.push(new UpdateShapePosition(node.id, translateX, translateY))
            //TODO: update x & y in the corresponding shape (inside shapes => canvas)
        });
    handleDrag(d3.select(node));
}

export {makeDraggable}