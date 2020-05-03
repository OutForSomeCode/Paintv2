import React from "react";
import {findDOMNode} from "react-dom";

const d3 = require("d3");


export default function selectDrag(comp: React.Component) {
    const node: any = findDOMNode(comp);
    let startPos = {x: 0, y: 0};

    function startDragging() {
        d3.select("#selectionField").remove();
        startPos = {x: d3.event.x, y: d3.event.y};
        // @ts-ignore
        d3.select(this)
            .append("rect")
            .attr("id", "selectionField")
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("class", "selection")
            .attr("x", startPos.x)
            .attr("y", startPos.y)
            .attr("width", 0)
            .attr("height", 0)
    }

    function dragging() {
        let width = d3.event.x - startPos.x;
        let height = d3.event.y - startPos.y;

        if (width < 0)
            d3.select("#selectionField").attr("x", startPos.x + width);

        if(height < 0)
            d3.select("#selectionField").attr("y", startPos.y + height);

        d3.select("#selectionField").attr("width", Math.abs(width)).attr("height", Math.abs(height));

        //todo add identifier class to each toplevel shape/group
    }

    function endDragging() {

    }

    const attach = d3.drag()
        .on("start", startDragging)
        .on("drag", dragging)
        .on("end", endDragging);

    attach(d3.select(node));
}