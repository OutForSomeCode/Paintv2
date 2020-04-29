import {findDOMNode} from "react-dom";
import {Commands} from "../controls/Commands";
import {UpdateItemPosition} from "../controls/UpdateItemPosition";
import {Vector2} from "../utility/Vector2";
import React from "react";

const d3 = require("d3");

export default function PolygonDrag(comp: React.Component) {
    const node: any = findDOMNode(comp);
    const commands = Commands.getInstance();
    // @ts-ignore
    let size = new Vector2(comp.props.width, comp.props.height);
    let pos = new Vector2(node.cx, node.cy);

    function dragStarted() {
        // @ts-ignore
        d3.select(this).raise().style("stroke", "#65aae6");
    }

    function dragging() {
        pos.x = d3.event.x;
        pos.y = d3.event.y;

        let plb = [pos.x + (size.x / 2), pos.y + (size.y / 2)];
        let prb = [pos.x - (size.x / 2), pos.y + (size.y / 2)];
        let ptm = [pos.x, pos.y - (size.y / 2)];
        let newPoints = [plb, prb, ptm];

        // @ts-ignore
        d3.select(this).attr("points", newPoints.toString());
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