document.addEventListener("DOMContentLoaded", function () {
  // Check if the Device Motion API is supported
  const isDeviceMotionSupported = 'DeviceMotionEvent' in window;

  // Check if motion sensors are enabled
  const isMotionSensorsEnabled = isDeviceMotionSupported && typeof window.DeviceMotionEvent.requestPermission === 'function';

  // Check if the Device Orientation API is supported
  const isDeviceOrientationSupported = 'DeviceOrientationEvent' in window;

  // Check if orientation sensors are enabled
  const isOrientationSensorsEnabled = isDeviceOrientationSupported && typeof window.DeviceOrientationEvent.requestPermission === 'function';

  // Check if A-Frame is supported
  const isAFrameSupported = typeof AFRAME !== 'undefined';

  // Function to apply styles based on conditions
  function applyStyles(elements, visibilityStyle, displayStyle) {
    elements.forEach(function (element) {
      element.style.visibility = visibilityStyle;
      element.style.display = displayStyle;
    });
  }

  // Elements with "yes_af_hide" attribute
  const yesAfHideElements = document.querySelectorAll('[yes_af_hide]');
  // Elements with "yes_af_remove" attribute
  const yesAfRemoveElements = document.querySelectorAll('[yes_af_remove]');
  // Elements with "no_af_hide" attribute
  const noAfHideElements = document.querySelectorAll('[no_af_hide]');
  // Elements with "no_af_remove" attribute
  const noAfRemoveElements = document.querySelectorAll('[no_af_remove]');

  // Check conditions and apply styles accordingly
  if (
    isDeviceMotionSupported &&
    isMotionSensorsEnabled &&
    isDeviceOrientationSupported &&
    isOrientationSensorsEnabled &&
    isAFrameSupported
  ) {
    // Apply styles for "yes" elements
    applyStyles(yesAfHideElements, 'hidden', '');
    applyStyles(yesAfRemoveElements, 'visible', 'none');
  } else {
    // Apply styles for "no" elements
    applyStyles(noAfHideElements, 'hidden', '');
    applyStyles(noAfRemoveElements, 'visible', 'none');
  }
});