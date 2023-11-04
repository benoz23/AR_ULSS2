// Get the camera element
const camera = document.querySelector('#camera');

document.getElementById('prev-button').onclick = function() {
    // Get the current position of the camera
    const currentPosition = camera.getAttribute('position');

    // Calculate the new position as an increment from the current position
    const newPosition = {
        x: parseFloat(currentPosition.x) - 0.25,
        y: currentPosition.y,
        z: currentPosition.z
    };

    // Get the boundaries for the container
    const container = document.querySelector('#container');
    const containerChildren = container.querySelectorAll('.container-child');

    // Check if there are any children with the class name
    if (containerChildren.length > 0) {
        // Get the first child (if any)
        const firstChild = containerChildren[0];
        const containerX = parseFloat(container.getAttribute('position').x);
        const firstChildX = parseFloat(firstChild.getAttribute('position').x);
        const firstChildWidth = parseFloat(firstChild.getAttribute('width'));

        // Check if the new position exceeds the beginning of the container
        if (newPosition.x < containerX + firstChildX - firstChildWidth / 2) {
            newPosition.x = containerX + firstChildX - firstChildWidth / 2;
        }
    }

    // Set the animation attributes
    camera.setAttribute('animation__prev', {
        property: 'position',
        to: newPosition,
        startEvents: 'prevButtonClick'
    });

    // Trigger the animation
    camera.emit('prevButtonClick');
};

document.getElementById('next-button').onclick = function() {
    // Get the current position of the camera
    const currentPosition = camera.getAttribute('position');

    // Calculate the new position as an increment from the current position
    const newPosition = {
        x: parseFloat(currentPosition.x) + 0.25,
        y: currentPosition.y,
        z: currentPosition.z
    };

    // Get the boundaries for the container
    const container = document.querySelector('#container');
    const containerChildren = container.querySelectorAll('.container-child');

    // Check if there are any children with the class name
    if (containerChildren.length > 0) {
        // Get the last child (if any)
        const lastChild = containerChildren[containerChildren.length - 1];
        const containerX = parseFloat(container.getAttribute('position').x);
        const lastChildX = parseFloat(lastChild.getAttribute('position').x);
        const lastChildWidth = parseFloat(lastChild.getAttribute('width'));

        // Check if the new position exceeds the end of the container
        if (newPosition.x > containerX + lastChildX + lastChildWidth / 2) {
            newPosition.x = containerX + lastChildX + lastChildWidth / 2;
        }
    }

    // Set the animation attributes
    camera.setAttribute('animation__next', {
        property: 'position',
        to: newPosition,
        startEvents: 'nextButtonClick'
    });

    // Trigger the animation
    camera.emit('nextButtonClick');
};
