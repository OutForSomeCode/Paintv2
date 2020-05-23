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

    let sTop = 1;
    let sBottom = 1;
    let sLeft = 1;
    let sRight = 1;

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
        sTop = scale(top, d3.event.y);
        sBottom = 1;
        sLeft = scale(left, d3.event.x);
        sRight = 1;

        left = d3.event.x;
        top = d3.event.y;

        updateDragPoints();
    }

    function dragPointRT() {
        sTop = scale(top, d3.event.y);
        sBottom = 1;
        sLeft = 1;
        sRight = scale(right, d3.event.x);

        right = d3.event.x;
        top = d3.event.y;

        updateDragPoints();
    }

    function dragPointLB() {
        sTop = 1;
        sBottom = scale(bottom, d3.event.y);
        sLeft = scale(left, d3.event.x);
        sRight = 1;

        left = d3.event.x;
        bottom = d3.event.y;

        updateDragPoints();
    }

    function dragPointRB() {
        sTop = 1;
        sBottom = scale(bottom, d3.event.y);
        sLeft = 1;
        sRight = scale(right, d3.event.x);

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

        console.log(sTop, sBottom, sLeft, sRight);
        console.log("---------------------")

        updateShapes(d3.select(".selected"));
    }

    function updateShapes(selected: any) {
        switch (selected.node().tagName) {
            case "ellipse":
                updateEllipse(selected);
                break;
            case "rect":
                updateRect(selected)
                break;
            case "polygon":
                updatePolygon(selected)
                break;
            case "g":
                updateGroup(selected);
                break;
            default:
                updateEllipse(selected);
                break;
        }
    }

    function updateEllipse(selected: any) {
        const current = selected.node().getBBox();
        const t = current.y * sTop;
        const b = (current.y + current.height) * sBottom;
        const l = current.x * sLeft;
        const r = (current.x + current.width) * sRight;

        selected
            .attr("rx", (r - l) / 2)
            .attr("ry", (b - t) / 2)
            .attr("cx", l + (r - l) / 2)
            .attr("cy", t + (b - t) / 2)
    }

    function updateRect(selected: any) {
        selected
            .attr("width", right - left)
            .attr("height", bottom - top)
            .attr("x", left)
            .attr("y", top);
    }

    function updatePolygon(selected: any) {
        selected
            .attr("points", `${left},${bottom} ${right},${bottom} ${left + (right - left) / 2},${top}`)
            .attr("cx", left + (right - left) / 2)
            .attr("cy", top + (bottom - top) / 2);
    }

    function updateGroup(selected: any) {
        // const current = selected.node().getBBox();
        d3.selectAll(`[id="${selected.node().id}"] > *`).each(function () {
            // @ts-ignore
            const item = d3.select(this);

            // const t = item.y * scale(current.y, top);
            // const b = (item.y + item.height) * scale(current.y + current.height, bottom);
            // const l = item.x * scale(current.x, left);
            // const r = (item.x + item.width) * scale(current.x + current.width, right);

            updateShapes(item);
        });
    }


}