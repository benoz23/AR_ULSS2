// Get the container and camera elements
const container = document.querySelector('#container');
const camera = document.querySelector('#camera');

// Get all container children
const containerChildren = container.querySelectorAll('.container-child');

// Check for children with width > height
for (const child of containerChildren) {
    const childWidth = child.offsetWidth;
    const childHeight = child.offsetHeight;

    if (childWidth > childHeight) {
        // Create two auxiliary entities
        const aux1 = document.createElement('a-entity');
        const aux2 = document.createElement('a-entity');

        // Set their class to "container-child"
        aux1.classList.add('container-child');
        aux2.classList.add('container-child');

        // Determine the auxiliary entities' positions
        const aux1X = child.getAttribute('position').x - (childWidth / 6);
        const aux2X = child.getAttribute('position').x + (childWidth / 6);
        const auxY = child.getAttribute('position').y;
        const auxZ = parseFloat(child.getAttribute('position').z) + 0.175;

        // Set the auxiliary entities' positions
        aux1.setAttribute('position', `${aux1X} ${auxY} ${auxZ}`);
        aux2.setAttribute('position', `${aux2X} ${auxY} ${auxZ}`);

        // Insert the auxiliary entities after the original child
        container.insertBefore(aux1, child.nextSibling);
        container.insertBefore(aux2, child.nextSibling);
    }
}

// Previous button click event handler
document.getElementById('prev-button').onclick = function() {
    // Find the active child
    const activeChild = container.querySelector('[active-child]');

    // Find the previous child based on the order of children
    const prevIndex = Array.from(containerChildren).indexOf(activeChild) - 1;

    if (prevIndex >= 0) {
        const prevChild = containerChildren[prevIndex];
        const prevPosition = prevChild.getAttribute('position');

        // Move the camera to the previous child's position
        camera.setAttribute('animation__prev', {
            property: 'position',
            to: `${prevPosition.x} ${parseFloat(prevPosition.y) + 0.075} ${parseFloat(prevPosition.z) + 0.175}`,
            startEvents: 'prevButtonClick'
        });

        // Remove the "active-child" attribute from the current active child
        activeChild.removeAttribute('active-child');

        // Set the "active-child" attribute on the previous child
        prevChild.setAttribute('active-child', '');

        // Trigger the animation
        camera.emit('prevButtonClick');
    }
};

// Next button click event handler
document.getElementById('next-button').onclick = function() {
    // Find the active child
    const activeChild = container.querySelector('[active-child]');

    // Find the next child based on the order of children
    const nextIndex = Array.from(containerChildren).indexOf(activeChild) + 1;

    if (nextIndex < containerChildren.length) {
        const nextChild = containerChildren[nextIndex];
        const nextPosition = nextChild.getAttribute('position');

        // Move the camera to the next child's position
        camera.setAttribute('animation__next', {
            property: 'position',
            to: `${nextPosition.x} ${parseFloat(nextPosition.y) + 0.075} ${parseFloat(nextPosition.z) + 0.175}`,
            startEvents: 'nextButtonClick'
        });

        // Remove the "active-child" attribute from the current active child
        activeChild.removeAttribute('active-child');

        // Set the "active-child" attribute on the next child
        nextChild.setAttribute('active-child', '');

        // Trigger the animation
        camera.emit('nextButtonClick');
    }
};
