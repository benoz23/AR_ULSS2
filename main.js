// Get the container and camera elements
const container = document.querySelector('#container');
const camera = document.querySelector('#camera');

// Get all container children
const containerChildren = container.querySelectorAll('.container-child');
// This script will be executed immediately after the plain HTML has loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the container and camera elements
    const container = document.querySelector('#container');
    const camera = document.querySelector('#camera');
    
    // Get all container children
    const containerChildren = container.querySelectorAll('.container-child');
    
    // Disable prev and next buttons before the check is done
    document.getElementById('prev-button').disabled = true;
    document.getElementById('next-button').disabled = true;
    
    // Check for children with width > height
    for (const child of containerChildren) {
        const childWidth = child.offsetWidth;
        const childHeight = child.offsetHeight;
    
        if (childWidth > childHeight) {
            // Create two auxiliary empty a-entity elements
            const aux1 = document.createElement('a-entity');
            aux1.classList.add('container-child');
    
            const aux2 = document.createElement('a-entity');
            aux2.classList.add('container-child');
    
            // Set the positions of the auxiliary entities
            const childPosition = child.getAttribute('position');
            const childX = parseFloat(childPosition.x);
            const childY = parseFloat(childPosition.y);
            const childZ = parseFloat(childPosition.z);
    
            aux1.setAttribute('position', `${childX - childWidth / 6} ${childY} ${childZ + 0.175}`);
            aux2.setAttribute('position', `${childX + childWidth / 6} ${childY} ${childZ + 0.175}`);
    
            // Insert the auxiliary entities into the container
            container.insertBefore(aux1, child.nextSibling);
            container.insertBefore(aux2, child.nextSibling);
        }
    }
});
// Enable prev and next buttons now that the check is done
document.getElementById('prev-button').disabled = false;
document.getElementById('next-button').disabled = false;

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
