// Get the camera element
const camera = document.querySelector('#camera');

document.getElementById('prev-button').onclick = function() {
    // Get the current position of the camera
    const currentPosition = camera.getAttribute('position');
    
    // Get all container children
    const children = document.querySelectorAll('.container-child');

    // Find the active child
    const activeChild = document.querySelector('.container-child[active-child]');

    // Find the index of the active child
    const activeChildIndex = Array.from(children).indexOf(activeChild);

    // Check if there is a previous child
    if (activeChildIndex > 0) {
        // Calculate the new position for the camera
        const newPosition = {
            x: parseFloat(currentPosition.x) - 0.175,
            y: currentPosition.y,
            z: currentPosition.z
        };

        // Set the new camera position
        camera.setAttribute('animation__prev', {
            property: 'position',
            to: newPosition,
            startEvents: 'prevButtonClick'
        });

        // Remove the "active-child" attribute from the current active child
        activeChild.removeAttribute('active-child');

        // Set the "active-child" attribute to the previous child
        children[activeChildIndex - 1].setAttribute('active-child', '');

        // Trigger the animation
        camera.emit('prevButtonClick');
    }
};

document.getElementById('next-button').onclick = function() {
    // Get the current position of the camera
    const currentPosition = camera.getAttribute('position');
    
    // Get all container children
    const children = document.querySelectorAll('.container-child');

    // Find the active child
    const activeChild = document.querySelector('.container-child[active-child]');

    // Find the index of the active child
    const activeChildIndex = Array.from(children).indexOf(activeChild);

    // Check if there is a next child
    if (activeChildIndex < children.length - 1) {
        // Calculate the new position for the camera
        const newPosition = {
            x: parseFloat(currentPosition.x) + 0.175,
            y: currentPosition.y,
            z: currentPosition.z
        };

        // Set the new camera position
        camera.setAttribute('animation__next', {
            property: 'position',
            to: newPosition,
            startEvents: 'nextButtonClick'
        });

        // Remove the "active-child" attribute from the current active child
        activeChild.removeAttribute('active-child');

        // Set the "active-child" attribute to the next child
        children[activeChildIndex + 1].setAttribute('active-child', '');

        // Trigger the animation
        camera.emit('nextButtonClick');
    }
};
