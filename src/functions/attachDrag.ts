import {Commands} from "../controls/Commands";
import {UpdateItemPosition} from "../controls/UpdateItemPosition";

const d3 = require("d3");

export default function attachDrag(id: any) {
    // @ts-ignore
    d3.select(this).attr('transform', 'translate(0, 0)')
    const commands = Commands.getInstance();
    let position = {
        x: 0,
        y: 0
    }

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
        commands.push(new UpdateItemPosition(id, position.x, position.y));

        // @ts-ignore
        d3.select(this).style("stroke", "#000000");
    }

    return d3.drag()
        .subject(function () {
            return position
        })
        .on("start", startDragging)
        .on("drag", dragging)
        .on("end", endDragging);
}