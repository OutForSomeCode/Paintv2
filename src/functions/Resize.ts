const d3 = require("d3");

export default function Resize() {
    const svg = d3.select("#canvas");
    const selectedShapeBBox = d3.select(".selected").node().getBBox();
    const padding = 7;

    const dragLT = d3.drag().on("drag", dragPointLT);
    const dragRT = d3.drag().on("drag", dragPointRT);
    const dragLB = d3.drag().on("drag", dragPointLB);
    const dragRB = d3.drag().on("drag", dragPointRB);

    let top = selectedShapeBBox.height < 0 ? selectedShapeBBox.y + selectedShapeBBox.height : selectedShapeBBox.y;
    let bottom = selectedShapeBBox.height < 0 ? selectedShapeBBox.y : selectedShapeBBox.y + selectedShapeBBox.height;
    let left = selectedShapeBBox.width < 0 ? selectedShapeBBox.x + selectedShapeBBox.width : selectedShapeBBox.x;
    let right = selectedShapeBBox.width < 0 ? selectedShapeBBox.x : selectedShapeBBox.x + selectedShapeBBox.width;

    let sx = 1;
    let sy = 1;

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

    //todo: add css for resizePoint in index.xss

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

    function scale(oldSize: number, newSize: number): number {
        return (1 / oldSize) * newSize;
    }

    function updateDragPoints() {
        pointLT.attr("cx", left).attr("cy", top);
        pointRT.attr("cx", right).attr("cy", top);
        pointLB.attr("cx", left).attr("cy", bottom);
        pointRB.attr("cx", right).attr("cy", bottom);

        console.log(sx, sy);
        console.log("---------------------")

        updateShapes(d3.select(".selected"), { t: top, b: bottom, l: left, r: right });
    }

    function updateShapes(selected: any, s: { t: number, b: number, l: number, r: number }) {
        switch (selected.node().tagName) {
            case "ellipse":
                updateEllipse(selected, s);
                break;
            case "rect":
                updateRect(selected, s)
                break;
            case "polygon":
                updatePolygon(selected, s)
                break;
            case "g":
                updateGroup(selected, s);
                break;
            default:
                updateEllipse(selected, s);
                break;
        }
    }

    function updateEllipse(selected: any, s: { t: number, b: number, l: number, r: number }) {

        selected
            .attr("rx", (s.r - s.l) / 2)
            .attr("ry", (s.b - s.t) / 2)
            .attr("cx", s.l + (s.r - s.l) / 2)
            .attr("cy", s.t + (s.b - s.t) / 2)
    }

    function updateRect(selected: any, s: { t: number, b: number, l: number, r: number }) {
        selected
            .attr("width", s.r - s.l)
            .attr("height", s.b - s.t)
            .attr("x", s.l)
            .attr("y", s.t);
    }

    function updatePolygon(selected: any, s: { t: number, b: number, l: number, r: number }) {
        selected
            .attr("points", `${s.l},${s.b} ${s.r},${s.b} ${s.l + (s.r - s.l) / 2},${s.t}`)
            .attr("cx", s.l + (s.r - s.l) / 2)
            .attr("cy", s.t + (s.b - s.t) / 2);
    }

    function updateGroup(selected: any, s: { t: number, b: number, l: number, r: number }) {
        const current = selected.node().getBBox();
        d3.selectAll(`[id="${selected.node().id}"] > *`).each(function () {
            // @ts-ignore
            const item = d3.select(this);
            const itemBBox = item.node().getBBox();
            const newScaling = {
                t: (itemBBox.y - current.y) * sy + s.t,
                b: ((itemBBox.y + itemBBox.height) - (current.y + current.height)) * sy + s.b,
                l: (itemBBox.x - current.x) * sx + s.l,
                r: ((itemBBox.x + itemBBox.width) - (current.x + current.width)) * sx + s.r,
            }
            console.log(newScaling);

            updateShapes(item, newScaling);
        });
    }
}