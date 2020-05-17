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
        left = d3.event.x;
        top = d3.event.y;

        updatePoints();
    }

    function dragPointRT() {
        right = d3.event.x;
        top = d3.event.y;

        updatePoints();
    }

    function dragPointLB() {
        left = d3.event.x;
        bottom = d3.event.y;

        updatePoints();
    }

    function dragPointRB() {
        right = d3.event.x;
        bottom = d3.event.y;

        updatePoints();
    }

    function updatePoints() {
        pointLT.attr("cx", left).attr("cy", top);
        pointRT.attr("cx", right).attr("cy", top);
        pointLB.attr("cx", left).attr("cy", bottom);
        pointRB.attr("cx", right).attr("cy", bottom);

        switch (d3.select(".selected").node().tagName) {
            case "ellipse":
                updateEllipse();
                break;
            case "rect":
                updateRect()
                break;
            case "polygon":
                updatePolygon()
                break;
            case "g":
                updateGroup();
                break;
            default:
                updateEllipse();
                break;
        }
    }

    function updateEllipse() {
        d3.select(".selected")
            .attr("rx", (right - left) / 2)
            .attr("ry", (bottom - top) / 2)
            .attr("cx", left + (right - left) / 2)
            .attr("cy", top + (bottom - top) / 2);
    }

    function updateRect() {
        d3.select(".selected")
            .attr("width", right - left)
            .attr("height", bottom - top)
            .attr("x", left)
            .attr("y", top);
    }

    function updatePolygon() {
        d3.select(".selected")
            .attr("points", `${left},${bottom} ${right},${bottom} ${left + (right - left) / 2},${top}`)
            .attr("cx", left + (right - left) / 2)
            .attr("cy", top + (bottom - top) / 2);
    }

    function updateGroup() {
        let scaleX = 1 / selectedShapeBBox.width * (right - left);
        let scaleY = 1 / selectedShapeBBox.height * (bottom - top);


        //todo: ???? .each
    }
}