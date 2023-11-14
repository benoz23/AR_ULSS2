document.addEventListener('DOMContentLoaded', function () {
  // Check for A-Frame support
  var afSupported = typeof AFRAME !== 'undefined' && document.querySelector('a-scene');

  // Check for Device Motion API support
  var motionSensorsEnabled = 'ondevicemotion' in window;

  if (motionSensorsEnabled) {
    // Listen for motion events to check if motion sensors are enabled
    window.addEventListener('devicemotion', function (event) {
      motionSensorsEnabled = event.accelerationIncludingGravity !== null;
      if (motionSensorsEnabled) {
        console.log('Motion sensors enabled');
      }
    });
  } else {
    console.error('Error: Device Motion API is not supported');
  }

  // Check for Device Orientation API support
  var orientationSensorsEnabled = motionSensorsEnabled && 'ondeviceorientation' in window;

  if (orientationSensorsEnabled) {
    // Listen for orientation events to check if orientation sensors are enabled
    window.addEventListener('deviceorientation', function (event) {
      orientationSensorsEnabled = event.alpha !== null || event.beta !== null || event.gamma !== null;
      if (orientationSensorsEnabled) {
        console.log('Orientation sensors enabled');
      }
    });
  } else {
    console.error('Error: Device Orientation API is not supported');
  }

  // Select elements to hide or remove based on feature support
  var elementsToHide = afSupported && orientationSensorsEnabled ? document.querySelectorAll('[yes_af_hide]') : document.querySelectorAll('[no_af_hide]');
  var elementsToRemove = afSupported && orientationSensorsEnabled ? document.querySelectorAll('[yes_af_remove]') : document.querySelectorAll('[no_af_remove]');

  // Apply CSS styles to elements with "visibility: hidden"
  elementsToHide.forEach(function (element) {
    element.classList.add('hidden');
  });

  // Apply CSS styles to elements with "display: none"
  elementsToRemove.forEach(function (element) {
    element.style.display = 'none';
  });
});
