
function handleMouseMove(event) {
    if (draggedElement) {
        const boundary = calculateBoundary(draggedElement);
        const deltaX = event.clientX - draggedElement.initialX;
        const deltaY = event.clientY - draggedElement.initialY;
        let newLeft = draggedElement.initialLeft + deltaX;
        let newTop = draggedElement.initialTop + deltaY;
        newLeft = Math.max(boundary.maxLeft, Math.min(newLeft, boundary.maxRight));
        newTop = Math.max(boundary.maxTop, Math.min(newTop, boundary.maxBottom));
        draggedElement.style.left = `${newLeft}px`;
        draggedElement.style.top = `${newTop}px`;
    }
}


function handleMouseDown(event) {
    draggedElement = event.target.parentElement;
    console.log(draggedElement);
    draggedElement.initialX = event.clientX;
    draggedElement.initialY = event.clientY;
    draggedElement.initialLeft = draggedElement.offsetLeft;
    draggedElement.initialTop = draggedElement.offsetTop;
}
function handleMouseUp() {
    draggedElement = null;
}