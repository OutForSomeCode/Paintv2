import React from "react";
import {findDOMNode} from "react-dom";
import {Vector2} from "../utility/Vector2";
import Selection from "./Selection";
import Resize from "./Resize";

const d3 = require("d3");

export default function Select(comp: React.Component, update: () => void) {
    const node: any = findDOMNode(comp);
    let startPos = {x: 0, y: 0};

    function startDragging() {
        d3.selectAll(".selected").classed("selected", false);
        d3.selectAll(".resizePoint").remove();
        startPos = {x: d3.event.x, y: d3.event.y};
        // @ts-ignore
        d3.select(this)
            .append("rect")
            .attr("id", "selectionField")
            .attr("class", "selection")
            .attr("x", startPos.x)
            .attr("y", startPos.y)
            .attr("width", 0)
            .attr("height", 0)
    }

    function dragging() {
        let width = d3.event.x - startPos.x;
        let height = d3.event.y - startPos.y;

        d3.select("#selectionField")
            .attr("x", width < 0 ? startPos.x + width : startPos.x)
            .attr("y", height < 0 ? startPos.y + height : startPos.y)
            .attr("width", Math.abs(width))
            .attr("height", Math.abs(height));

        d3.selectAll("#canvas > rect, #canvas > ellipse, #canvas > polygon, #canvas > g").each(function () {
            // @ts-ignore
            const item = d3.select(this);

            if (item.node() !== d3.select("#selectionField").node()) {
                const itemBBox = item.node().getBBox();
                const itemCenter = new Vector2(itemBBox.x + (itemBBox.width / 2), itemBBox.y + (itemBBox.height / 2));
                const selectBBox = d3.select("#selectionField").node().getBBox();

                if (itemCenter.x > selectBBox.x && itemCenter.x < (selectBBox.x + selectBBox.width) &&
                    itemCenter.y > selectBBox.y && itemCenter.y < (selectBBox.y + selectBBox.height))
                    item.classed("selected", true);
                else
                    item.classed("selected", false);
            }
        });
    }

    function endDragging() {
        d3.select("#selectionField").remove();
        if (Selection() === 1) {
            Resize(update);
        }
    }

    const attach = d3.drag()
        .on("start", startDragging)
        .on("drag", dragging)
        .on("end", endDragging);

    attach(d3.select(node));
}