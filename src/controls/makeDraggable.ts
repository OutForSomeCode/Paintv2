import {Canvas} from "../Canvas";

function makeDraggable(evt: any) {
    let svg = evt.target;
    let selectedElement: any = false;

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

    function startDrag(evt: any) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
        }
    }

    function drag(evt: any) {
        if (selectedElement) {
            evt.preventDefault();
            selectedElement.setAttributeNS(null, "x", evt.clientX);
            selectedElement.setAttributeNS(null, "y", evt.clientY);
        }
    }

    function endDrag(evt: any) {
        selectedElement = null;
    }
}

export {makeDraggable}