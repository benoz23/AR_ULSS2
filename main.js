// Prevent prev and next button to work before checking ends
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
prevButton.disabled = true;
nextButton.disabled = true;

// Check if any container child has width > height
const containerChildren = container.querySelectorAll('.container-child');
let widthGreaterThanHeightFound = false;

for (const containerChild of containerChildren) {
  const width = containerChild.offsetWidth;
  const height = containerChild.offsetHeight;

  if (width > height) {
    widthGreaterThanHeightFound = true;
    break;
  }
}

if (widthGreaterThanHeightFound) {
  // Add auxiliary elements for children with width > height
  for (const containerChild of containerChildren) {
    const width = containerChild.offsetWidth;
    const height = containerChild.offsetHeight;

    if (width > height) {
      // Create two auxiliary empty a-entity elements
      const auxEntity1 = document.createElement('a-entity');
      const auxEntity2 = document.createElement('a-entity');

      // Add class "container-child" to both auxiliary elements
      auxEntity1.classList.add('container-child');
      auxEntity2.classList.add('container-child');

      // Set position attributes for auxiliary elements
      const auxEntity1Position = {
        x: containerChild.getAttribute('position').x - width / 6,
        y: containerChild.getAttribute('position').y,
        z: parseFloat(containerChild.getAttribute('position').z) + 0.175
      };

      const auxEntity2Position = {
        x: parseFloat(containerChild.getAttribute('position').x) + width / 6,
        y: containerChild.getAttribute('position').y,
        z: parseFloat(containerChild.getAttribute('position').z) + 0.175
      };

      auxEntity1.setAttribute('position', auxEntity1Position);
      auxEntity2.setAttribute('position', auxEntity2Position);

      // Insert auxiliary elements after the original element
      container.insertBefore(auxEntity2, containerChild.nextSibling);
      container.insertBefore(auxEntity1, containerChild.nextSibling);
    }
  }
}

// Get the container and camera elements
const container = document.querySelector('#container');
const camera = document.querySelector('#camera');

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
