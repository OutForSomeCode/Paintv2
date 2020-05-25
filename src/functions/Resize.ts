import {Commands} from "../Commands/Commands";
import {CommandResizeSelected} from "../Commands/CommandResizeSelected";
import {BBox} from "../utility/BBox";
import {Group} from "../shapes/Group";
import {Items} from "../shapes/Items";

const d3 = require("d3");

/**
 * resize the selected shape or group by using the 4 drag points on the corners
 * @param update: callback to the update function in index.tsx
 * @constructor
 */
export default function Resize(update: () => void) {
    const svg = d3.select("#canvas");
    const commands = Commands.getInstance();
    const items = Items.getInstance();
    const selectedShapeBBox = d3.select(".selected").node().getBBox();
    const padding = 7;
    let isDragStart = true;

    /**
     * setup the drag calls for the 4 drag points
     */
    const dragLT = d3.drag().on("drag", dragPointLT).on("end", updateShapeData);
    const dragRT = d3.drag().on("drag", dragPointRT).on("end", updateShapeData);
    const dragLB = d3.drag().on("drag", dragPointLB).on("end", updateShapeData);
    const dragRB = d3.drag().on("drag", dragPointRB).on("end", updateShapeData);

    /**
     * top: y coordinate of the element that's being resized
     * bottom: y + height coordinate coordinate of the element that's being resized
     * left: x coordinate of the element that's being resized
     * right: x + width coordinate of the element that's being resized
     */
    let top = selectedShapeBBox.height < 0 ? selectedShapeBBox.y + selectedShapeBBox.height : selectedShapeBBox.y;
    let bottom = selectedShapeBBox.height < 0 ? selectedShapeBBox.y : selectedShapeBBox.y + selectedShapeBBox.height;
    let left = selectedShapeBBox.width < 0 ? selectedShapeBBox.x + selectedShapeBBox.width : selectedShapeBBox.x;
    let right = selectedShapeBBox.width < 0 ? selectedShapeBBox.x : selectedShapeBBox.x + selectedShapeBBox.width;

    /**
     * sx: scale x factor
     * sy: scale y factor
     */
    let sx = 1;
    let sy = 1;

    /**
     * add drag points to the canvas
     */
    let pointLT = svg.append('circle')
        .attr('class', 'resizePoint')
        .attr("cx", left)
        .attr("cy", top)
        .attr('transform', `translate(-${padding}, -${padding})`)
        .attr("r", 5)
        .call(dragLT);
    let pointRT = svg.append('circle')
        .attr('class', 'resizePoint')
        .attr("cx", right)
        .attr("cy", top)
        .attr('transform', `translate(${padding}, -${padding})`)
        .attr("r", 5)
        .call(dragRT);
    let pointLB = svg.append('circle')
        .attr('class', 'resizePoint')
        .attr("cx", left)
        .attr("cy", bottom)
        .attr('transform', `translate(-${padding}, ${padding})`)
        .attr("r", 5)
        .call(dragLB);
    let pointRB = svg.append('circle')
        .attr('class', 'resizePoint')
        .attr("cx", right)
        .attr("cy", bottom)
        .attr('transform', `translate(${padding}, ${padding})`)
        .attr("r", 5)
        .call(dragRB);

    /**
     * each drag point has its own function to update the coordinates and scale accordingly
     */
    function dragPointLT() {
        sx = scale(right - left, right - d3.event.x);
        sy = scale(bottom - top, bottom - d3.event.y);

        left = d3.event.x;
        top = d3.event.y;

        updateDragPoints();
    }

    function dragPointRT() {
        sx = scale(right - left, d3.event.x - left);
        sy = scale(bottom - top, bottom - d3.event.y);

        right = d3.event.x;
        top = d3.event.y;

        updateDragPoints();
    }

    function dragPointLB() {
        sx = scale(right - left, right - d3.event.x);
        sy = scale(bottom - top, d3.event.y - top);

        left = d3.event.x;
        bottom = d3.event.y;

        updateDragPoints();
    }

    function dragPointRB() {
        sx = scale(right - left, d3.event.x - left);
        sy = scale(bottom - top, d3.event.y - top);

        right = d3.event.x;
        bottom = d3.event.y;

        updateDragPoints();
    }

    /**
     * calculate the scaling's factor
     * @param oldSize:
     * @param newSize:
     */
    function scale(oldSize: number, newSize: number): number {
        return (1 / oldSize) * newSize;
    }

    /**
     * update all drag points when 1 point is being dragged
     */
    function updateDragPoints() {
        pointLT.attr("cx", left).attr("cy", top);
        pointRT.attr("cx", right).attr("cy", top);
        pointLB.attr("cx", left).attr("cy", bottom);
        pointRB.attr("cx", right).attr("cy", bottom);

        if (isDragStart) {
            updateAllGroupBBox();
            isDragStart = false;
        }
        updateShapes(d3.select(".selected"), new BBox(top, bottom, left, right));
    }

    /**
     * update the selected shape or group of shapes
     * @param selected: current shape that's being updated
     * @param bbox: the new size of the bounding box
     */
    function updateShapes(selected: any, bbox: BBox) {
        switch (selected.node().tagName) {
            case "ellipse":
                updateEllipse(selected, bbox);
                break;
            case "rect":
                updateRect(selected, bbox)
                break;
            case "polygon":
                updatePolygon(selected, bbox)
                break;
            case "g":
                updateGroup(selected, bbox);
                break;
            default:
                updateEllipse(selected, bbox);
                break;
        }
    }

    /**
     * update the selected ellipse
     * @param selected: the selected ellipse
     * @param bbox: the new size of the bounding box
     */
    function updateEllipse(selected: any, bbox: BBox) {
        selected
            .attr("rx", bbox.width / 2)
            .attr("ry", bbox.height / 2)
            .attr("cx", bbox.cx)
            .attr("cy", bbox.cy)
    }

    /**
     * update the selected rectangle
     * @param selected: the selected rectangle
     * @param bbox: the new size of the bounding box
     */
    function updateRect(selected: any, bbox: BBox) {
        selected
            .attr("width", bbox.width)
            .attr("height", bbox.height)
            .attr("x", bbox.left)
            .attr("y", bbox.top);
    }

    /**
     * update teh selected polygon (triangle)
     * @param selected: the selected polygon
     * @param bbox: the new size of the bounding box
     */
    function updatePolygon(selected: any, bbox: BBox) {
        selected
            .attr("points", `${bbox.left},${bbox.bottom} ${bbox.right},${bbox.bottom} ${bbox.cx},${bbox.top}`)
            .attr("cx", bbox.cx)
            .attr("cy", bbox.cy);
    }

    /**
     * loop through all sup shapes of the selected group and update them accordingly
     * @param selected: the selected group
     * @param bbox: the new size of the bounding box
     */
    function updateGroup(selected: any, bbox: BBox) {
        const groupBBox = selected.node().getBBox();
        d3.selectAll(`[id="${selected.node().id}"] > *`).each(function () {
            // @ts-ignore
            const item = d3.select(this);
            const itemBBox = item.node().getBBox();
            const newBbox = new BBox(
                (itemBBox.y - groupBBox.y) * sy + bbox.top,
                ((itemBBox.y + itemBBox.height) - (groupBBox.y + groupBBox.height)) * sy + bbox.bottom,
                (itemBBox.x - groupBBox.x) * sx + bbox.left,
                ((itemBBox.x + itemBBox.width) - (groupBBox.x + groupBBox.width)) * sx + bbox.right,
            );
            updateShapes(item, newBbox);
        });
    }

    /**
     * when done with dragging to resize, add this action to the commands list (undo / redo)
     */
    function updateShapeData() {
        commands.push(new CommandResizeSelected(d3.select(".selected").node().id, selectedShapeBBox));
        update();
        isDragStart = true;
    }

    /**
     * update all groups there bbox data on drag start
     */
    function updateAllGroupBBox() {
        d3.selectAll("#canvas > g").each(function () {
            // @ts-ignore
            const item = d3.select(this).node();
            const itemBBox = item.getBBox();
            const g = items.get(item.id) as Group;
            const bbox = new BBox(
                itemBBox.y,
                itemBBox.y + itemBBox.height,
                itemBBox.x,
                itemBBox.x + itemBBox.width
            );
            g.updateBBox(bbox);
        });
    }
}