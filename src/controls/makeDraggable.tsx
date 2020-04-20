import React from "react";
import {findDOMNode} from "react-dom";
const d3 = require("d3");

function makeDraggable(comp: React.Component) {
    let translateX = 0;
    let translateY = 0;
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
        });
    const node: any = findDOMNode(comp);
    handleDrag(d3.select(node));
}

export {makeDraggable}