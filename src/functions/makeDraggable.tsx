import React from "react";
import {findDOMNode} from "react-dom";
import {Commands} from "../controls/Commands";
import {UpdateShapePosition} from "../controls/UpdateShapePosition";
import {Vector2} from "../utility/Vector2";

const d3 = require("d3");

function makeDraggable(comp: React.Component) {
    const node: any = findDOMNode(comp);
    const commands = Commands.getInstance()

    let translate: Vector2;

    const handleDrag = d3.drag()
        .subject(function () {
            return translate
        })
        .on('drag', function () {
            // @ts-ignore
            const me = d3.select(this);
            const transform = `translate(${d3.event.x}, ${d3.event.y})`;
            translate = new Vector2(d3.event.x, d3.event.y)
            me.attr('transform', transform);
        }).on('end', function () {
            commands.push(new UpdateShapePosition(node.id, translate));
        });
    handleDrag(d3.select(node));
}

export {makeDraggable}