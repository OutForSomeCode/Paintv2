const d3 = require("d3");

export default function Resize() {
    const svg = d3.select("#canvas");
    const selectedShapeBBox = d3.select(".selected").node().getBBox();
    const padding = 7;

    /**
     * setup the drag calls for the 4 drag points
     */
    const dragLT = d3.drag().on("drag", dragPointLT);
    const dragRT = d3.drag().on("drag", dragPointRT);
    const dragLB = d3.drag().on("drag", dragPointLB);
    const dragRB = d3.drag().on("drag", dragPointRB);

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
     * sx: scale x coordinate
     * sy: scale y coordinate
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
     * each drag point has its own function to update the coordinates an scale accordingly
     */
    function dragPointLT() {
        sx = scale(left, d3.event.x);
        sy = scale(top, d3.event.y);

        left = d3.event.x;
        top = d3.event.y;

        updateDragPoints();
    }

    function dragPointRT() {
        sx = scale(right, d3.event.x);
        sy = scale(top, d3.event.y);

        right = d3.event.x;
        top = d3.event.y;

        updateDragPoints();
    }

    function dragPointLB() {
        sx = scale(left, d3.event.x);
        sy = scale(bottom, d3.event.y);

        left = d3.event.x;
        bottom = d3.event.y;

        updateDragPoints();
    }

    function dragPointRB() {
        sx = scale(right, d3.event.x);
        sy = scale(bottom, d3.event.y);

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

        updateShapes(d3.select(".selected"), { t: top, b: bottom, l: left, r: right });
    }

    /**
     * update the selected shape or group of shapes
     * @param selected: current shape that's being updated
     * @param bbox: the new size of the bounding box
     */
    function updateShapes(selected: any, bbox: { t: number, b: number, l: number, r: number }) {
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
    function updateEllipse(selected: any, bbox: { t: number, b: number, l: number, r: number }) {
        selected
            .attr("rx", (bbox.r - bbox.l) / 2)
            .attr("ry", (bbox.b - bbox.t) / 2)
            .attr("cx", bbox.l + (bbox.r - bbox.l) / 2)
            .attr("cy", bbox.t + (bbox.b - bbox.t) / 2)
    }

    /**
     * update the selected rectangle
     * @param selected: the selected rectangle
     * @param bbox: the new size of the bounding box
     */
    function updateRect(selected: any, bbox: { t: number, b: number, l: number, r: number }) {
        selected
            .attr("width", bbox.r - bbox.l)
            .attr("height", bbox.b - bbox.t)
            .attr("x", bbox.l)
            .attr("y", bbox.t);
    }

    /**
     * update teh selected polygon (triangle)
     * @param selected: the selected polygon
     * @param bbox: the new size of the bounding box
     */
    function updatePolygon(selected: any, bbox: { t: number, b: number, l: number, r: number }) {
        selected
            .attr("points", `${bbox.l},${bbox.b} ${bbox.r},${bbox.b} ${bbox.l + (bbox.r - bbox.l) / 2},${bbox.t}`)
            .attr("cx", bbox.l + (bbox.r - bbox.l) / 2)
            .attr("cy", bbox.t + (bbox.b - bbox.t) / 2);
    }

    /**
     * loop through all sup shapes of the selected group and update them accordingly
     * @param selected: the selected group
     * @param bbox: the new size of the bounding box
     */
    function updateGroup(selected: any, bbox: { t: number, b: number, l: number, r: number }) {
        const groupBBox = selected.node().getBBox();
        d3.selectAll(`[id="${selected.node().id}"] > *`).each(function () {
            // @ts-ignore
            const item = d3.select(this);
            const itemBBox = item.node().getBBox();
            const newBbox = {
                t: (itemBBox.y - groupBBox.y) * sy + bbox.t,
                b: ((itemBBox.y + itemBBox.height) - (groupBBox.y + groupBBox.height)) * sy + bbox.b,
                l: (itemBBox.x - groupBBox.x) * sx + bbox.l,
                r: ((itemBBox.x + itemBBox.width) - (groupBBox.x + groupBBox.width)) * sx + bbox.r,
            }
            console.log(newBbox);

            updateShapes(item, newBbox);
        });
    }
}