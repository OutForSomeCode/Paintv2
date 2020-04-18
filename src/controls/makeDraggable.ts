function makeDraggable(evt: any) {
    let svg = evt.target;
    let selectedElement: any = false;

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

    function getMousePosition(evt: any) {
        let CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    function startDrag(evt: any) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
        }
    }

    function drag(evt: any) {
        if (selectedElement) {
            evt.preventDefault();
            let pos = getMousePosition(evt);
            selectedElement.setAttributeNS(null, "x", pos.x);
            selectedElement.setAttributeNS(null, "y", pos.y);
        }
    }

    function endDrag(evt: any) {
        selectedElement = null;
    }
}

export {makeDraggable}