// Get the container and camera elements
const container = document.querySelector('#container');
const camera = document.querySelector('#camera');

// Get all container children
const containerChildren = container.querySelectorAll('.container-child');

document.getElementById('prev-button').onclick = function() {
    // Find the active child
    const activeChild = container.querySelector('[active-child]');

    // Find the previous child based on the order of children
    const prevIndex = Array.from(containerChildren).indexOf(activeChild) - 1;

    if (prevIndex >= 0) {
        const prevChild = containerChildren[prevIndex];
        const prevPosition = prevChild.getAttribute('position');

        // Handle cases where width > height by considering it as 3 positions
        const prevChildWidth = parseFloat(prevChild.getAttribute('width'));
        const prevChildHeight = parseFloat(prevChild.getAttribute('height'));

        if (prevChildWidth > prevChildHeight) {
            // Camera stops at three positions for the child
            const positions = [
                `${prevPosition.x} ${parseFloat(prevPosition.y) + 0.075} ${parseFloat(prevPosition.z) + 0.175}`,
                `${prevPosition.x} ${parseFloat(prevPosition.y) + 0.075} ${parseFloat(prevPosition.z)}`,
                `${prevPosition.x} ${parseFloat(prevPosition.y) + 0.075} ${parseFloat(prevPosition.z) - 0.175}`
            ];

            for (const position of positions) {
                camera.setAttribute('animation__prev', {
                    property: 'position',
                    to: position,
                    startEvents: 'prevButtonClick'
                });

                camera.emit('prevButtonClick');

                // Delay to allow camera animation to complete
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } else {
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

        // Handle cases where width > height by considering it as 3 positions
        const nextChildWidth = parseFloat(nextChild.getAttribute('width'));
        const nextChildHeight = parseFloat(nextChild.getAttribute('height'));

        if (nextChildWidth > nextChildHeight) {
            // Camera stops at three positions for the child
            const positions = [
                `${nextPosition.x} ${parseFloat(nextPosition.y) + 0.075} ${parseFloat(nextPosition.z) - 0.175}`,
                `${nextPosition.x} ${parseFloat(nextPosition.y) + 0.075} ${parseFloat(nextPosition.z)}`,
                `${nextPosition.x} ${parseFloat(nextPosition.y) + 0.075} ${parseFloat(nextPosition.z) + 0.175}`
            ];

            for (const position of positions) {
                camera.setAttribute('animation__next', {
                    property: 'position',
                    to: position,
                    startEvents: 'nextButtonClick'
                });

                camera.emit('nextButtonClick');

                // Delay to allow camera animation to complete
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } else {
            // Move the camera to the next child's position
            camera.setAttribute('animation__next', {
                property: 'position',
                to: `${nextPosition.x} ${parseFloat(nextPosition.y) + 0.075} ${parseFloat(nextPosition.z) - 0.175}`,
                startEvents: 'nextButtonClick'
            });

            // Remove the "active-child" attribute from the current active child
            activeChild.removeAttribute('active-child');

            // Set the "active-child" attribute on the next child
            nextChild.setAttribute('active-child', '');

            // Trigger the animation
            camera.emit('nextButtonClick');
        }
    }
};
