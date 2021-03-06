import {Commands} from "../Commands/Commands";
import React from "react";
import {findDOMNode} from "react-dom";
import {Vector2} from "../utility/Vector2";
import {CommandUpdatePosition} from "../Commands/CommandUpdatePosition";
import Selection from "./Selection";
import Resize from "./Resize";

const d3 = require("d3");

/**
 * drag functionality for shapes and groups
 * @param comp: react component
 * @param update: callback to the update function in index.tsx
 * @constructor
 */
export default function Drag(comp: React.Component, update: () => void) {
    const node: any = findDOMNode(comp);
    const commands = Commands.getInstance();
    let position = new Vector2(0, 0);

    /**
     * remove selected classes, resize points, disable context menu
     */
    function startDragging() {
        d3.selectAll(".selected").classed("selected", false);
        d3.selectAll(".resizePoint").remove();
        d3.select("#contextMenu").style('display', 'none');

        // @ts-ignore
        d3.select(this).raise().classed("selected", true);
    }

    /**
     * while dragging apply translation
     */
    function dragging() {
        const translate = `translate(${d3.event.x}, ${d3.event.y})`;
        position.x = d3.event.x;
        position.y = d3.event.y;

        // @ts-ignore
        d3.select(this).attr('transform', translate);
    }

    /**
     * when done with dragging, add this action to the commands list (undo / redo)
     */
    function endDragging() {
        if (position.x >= 1 || position.x <= -1 || position.y >= 1 || position.y <= -1) //prevent "empty" commands in the history que
            commands.push(new CommandUpdatePosition(node.id, position));
        // @ts-ignore
        d3.select(this).attr('transform', null);
        update();
        if (Selection() === 1) {
            Resize(update);
        }
    }

    /**
     * prevent default right click menu
     */
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

    /**
     * custom right click menu
     */
    d3.select(node)
        .on("click", preventClick)
        .on("contextmenu", function () {
            // @ts-ignore
            if (d3.select(this).classed("selected")) {
                // @ts-ignore
                let position = d3.mouse(this);

                d3.select('#contextMenu')
                    .style('position', 'absolute')
                    .style('display', 'block')
                    .style('left', position[0] + "px")
                    .style('top', position[1] + "px")

                d3.event.preventDefault();
            }
        })
}