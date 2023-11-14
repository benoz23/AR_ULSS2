document.addEventListener('DOMContentLoaded', function () {
  var elementsToHide = [];
  var elementsToRemove = [];

  // Check if Device Motion API is supported
  if ('ondevicemotion' in window) {
    // Device Motion API is supported
    console.log('Device Motion API supported');

    // Check if the device has motion sensors enabled
    window.addEventListener('devicemotion', function(event) {
      if (event.accelerationIncludingGravity) {
        // Motion sensors are enabled
        console.log('Motion sensors enabled');
        
        // Check if Device Orientation API is supported
        if ('ondeviceorientation' in window) {
          // Device Orientation API is supported
          console.log('Device Orientation API supported');

          // Check if the device has orientation sensors enabled
          window.addEventListener('deviceorientation', function(event) {
            if (event.alpha !== null || event.beta !== null || event.gamma !== null) {
              // Orientation sensors are enabled
              console.log('Orientation sensors enabled');

              // Check if A-Frame is supported
              if (typeof AFRAME !== 'undefined') {
                // A-Frame is supported
                elementsToHide = document.querySelectorAll('[yes_af_hide]');
                elementsToRemove = document.querySelectorAll('[yes_af_remove]');
              }
            }
          });
        }
      }
    });
  }

  // If any condition fails, set elements for no A-Frame support
  if (elementsToHide.length === 0 && elementsToRemove.length === 0) {
    elementsToHide = document.querySelectorAll('[no_af_hide]');
    elementsToRemove = document.querySelectorAll('[no_af_remove]');
  }

  // Apply CSS styles to elements with "visibility: hidden"
  elementsToHide.forEach(function (element) {
    element.style.visibility = 'hidden';
  });

  // Apply CSS styles to elements with "display: none"
  elementsToRemove.forEach(function (element) {
    element.style.display = 'none';
  });
});
