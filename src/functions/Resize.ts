const d3 = require("d3");

export default function Resize() {
    const svg = d3.select("#canvas");
    const selectedShape = d3.select(".selected").node();
    const selectedShapeBBox = selectedShape.getBBox();
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
    }
}