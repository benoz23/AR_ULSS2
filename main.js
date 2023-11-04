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

    // Set the animation attributes
    camera.setAttribute('animation__next', {
        property: 'position',
        to: newPosition,
        startEvents: 'nextButtonClick'
    });
    
    // Trigger the animation
    camera.emit('nextButtonClick');
};
