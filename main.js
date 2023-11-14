document.addEventListener('DOMContentLoaded', function () {
  // Check for both Device Motion and Orientation APIs
  const deviceMotionSupported = 'ondevicemotion' in window;
  const deviceOrientationSupported = 'ondeviceorientation' in window;

  // Common logic for handling A-Frame or non-A-Frame scenarios
  function handleDeviceCapabilities(isAFramePresent) {
    const hideSelector = isAFramePresent ? '[yes_af_hide]' : '[no_af_hide]';
    const removeSelector = isAFramePresent ? '[yes_af_remove]' : '[no_af_remove]';

    const hideElements = document.querySelectorAll(hideSelector);
    const removeElements = document.querySelectorAll(removeSelector);

    hideElements.forEach(element => element.style.visibility = 'hidden');
    removeElements.forEach(element => element.style.display = 'none');
  }

  // Handle device motion API
  if (deviceMotionSupported) {
    window.addEventListener('devicemotion', function (event) {
      if (event.accelerationIncludingGravity) {
        console.log('Motion sensors enabled');
        handleDeviceCapabilities(typeof AFRAME !== 'undefined');
      } else {
        console.log('Motion sensors not enabled');
        handleDeviceCapabilities(false);
      }
    });
  } else {
    console.log('Device Motion API not supported');
    handleDeviceCapabilities(false);
  }

  // Handle device orientation API
  if (deviceOrientationSupported) {
    window.addEventListener('deviceorientation', function (event) {
      if (event.alpha !== null || event.beta !== null || event.gamma !== null) {
        console.log('Orientation sensors enabled');
        handleDeviceCapabilities(typeof AFRAME !== 'undefined');
      } else {
        console.log('Orientation sensors not enabled');
        handleDeviceCapabilities(false);
      }
    });
  } else {
    console.log('Device Orientation API not supported');
    handleDeviceCapabilities(false);
  }
});