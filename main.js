// Get the container and camera elements
const container = document.querySelector('#container');
const camera = document.querySelector('#camera');

// Get all container children
const containerChildren = container.querySelectorAll('.container-child');

// Function to check if an element's width is greater than its height
function isWidthGreaterThanHeight(element) {
    const width = parseFloat(element.getAttribute('width'));
    const height = parseFloat(element.getAttribute('height'));
    return width > height;
}

// Function to calculate coordinates for auxiliary elements
function calculateAuxCoordinates(auxiledElement, isSecondAux) {
    const auxX = parseFloat(auxiledElement.getAttribute('position').x);
    const auxY = parseFloat(auxiledElement.getAttribute('position').y);
    const auxZ = parseFloat(auxiledElement.getAttribute('position').z);

    // Calculate the x-coordinate for the auxiliary elements
    const offset = parseFloat(auxiledElement.getAttribute('width')) / 6;
    const auxXCoord = isSecondAux ? auxX + offset : auxX - offset;

    return { x: auxXCoord, y: auxY, z: auxZ };
}

// Create an array to store the stopping points
const stoppingPoints = [];

// Iterate through the container children and add stopping points for exceptions
containerChildren.forEach((child, index) => {
    stoppingPoints.push(child);

    // Check if the current child is an exception
    if (isWidthGreaterThanHeight(child)) {
        // Create two auxiliary stopping points
        const aux1 = document.createElement('a-entity');
        const aux1Coordinates = calculateAuxCoordinates(child, false);
        aux1.setAttribute('position', aux1Coordinates);
        stoppingPoints.push(aux1);

        const aux2 = document.createElement('a-entity');
        const aux2Coordinates = calculateAuxCoordinates(child, true);
        aux2.setAttribute('position', aux2Coordinates);
        stoppingPoints.push(aux2);
    }
});

// Index to track the current stopping point
let stoppingPointIndex = 0;

document.getElementById('prev-button').onclick = function() {
    // Find the active child
    const activeChild = container.querySelector('[active-child]');

    if (stoppingPointIndex > 0) {
        stoppingPointIndex--;
        const prevStoppingPoint = stoppingPoints[stoppingPointIndex];

        if (prevStoppingPoint) {
            const prevPosition = prevStoppingPoint.getAttribute('position');

            // Move the camera to the previous stopping point's position
            camera.setAttribute('animation__prev', {
                property: 'position',
                to: `${prevPosition.x} ${prevPosition.y} ${prevPosition.z}`,
                startEvents: 'prevButtonClick'
            });

            // Remove the "active-child" attribute from the current active child
            activeChild.removeAttribute('active-child');

            // Set the "active-child" attribute on the previous stopping point
            prevStoppingPoint.setAttribute('active-child', '');

            // Trigger the animation
            camera.emit('prevButtonClick');
        }
    }
};

document.getElementById('next-button').onclick = function() {
    // Find the active child
    const activeChild = container.querySelector('[active-child]');

    if (stoppingPointIndex < stoppingPoints.length - 1) {
        stoppingPointIndex++;
        const nextStoppingPoint = stoppingPoints[stoppingPointIndex];

        if (nextStoppingPoint) {
            const nextPosition = nextStoppingPoint.getAttribute('position');

            // Move the camera to the next stopping point's position
            camera.setAttribute('animation__next', {
                property: 'position',
                to: `${nextPosition.x} ${nextPosition.y} ${nextPosition.z}`,
                startEvents: 'nextButtonClick'
            });

            // Remove the "active-child" attribute from the current active child
            activeChild.removeAttribute('active-child');

            // Set the "active-child" attribute on the next stopping point
            nextStoppingPoint.setAttribute('active-child', '');

            // Trigger the animation
            camera.emit('nextButtonClick');
        }
    }
};
