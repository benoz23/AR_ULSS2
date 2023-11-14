document.addEventListener("DOMContentLoaded", function () {
  // Check if the Device Motion API is supported
  const isDeviceMotionSupported = 'DeviceMotionEvent' in window;
  console.log('Device Motion API Supported:', isDeviceMotionSupported);

  // Check if motion sensors are enabled
  const isMotionSensorsEnabled = isDeviceMotionSupported && ('ontouchstart' in window || window.DeviceMotionEvent && 'function' === typeof window.DeviceMotionEvent.requestPermission);
  console.log('Motion Sensors Enabled:', isMotionSensorsEnabled);

  // Check if the Device Orientation API is supported
  const isDeviceOrientationSupported = 'DeviceOrientationEvent' in window;
  console.log('Device Orientation API Supported:', isDeviceOrientationSupported);

  // Check if orientation sensors are enabled
  const isOrientationSensorsEnabled = isDeviceOrientationSupported && ('ontouchstart' in window || window.DeviceOrientationEvent && 'function' === typeof window.DeviceOrientationEvent.requestPermission);
  console.log('Orientation Sensors Enabled:', isOrientationSensorsEnabled);

  // Check if A-Frame is supported
  const isAFrameSupported = typeof AFRAME !== 'undefined';
  console.log('A-Frame Supported:', isAFrameSupported);

  // Function to apply styles based on conditions
  function applyStyles(elements, visibilityStyle, displayStyle) {
    elements.forEach(function (element) {
      element.style.visibility = visibilityStyle;
      element.style.display = displayStyle;
    });
  }

  // Elements with "yes_af_hide" attribute
  const yesAfHideElements = document.querySelectorAll('[yes_af_hide]');
  console.log('Elements with yes_af_hide attribute:', yesAfHideElements);

  // Elements with "yes_af_remove" attribute
  const yesAfRemoveElements = document.querySelectorAll('[yes_af_remove]');
  console.log('Elements with yes_af_remove attribute:', yesAfRemoveElements);

  // Elements with "no_af_hide" attribute
  const noAfHideElements = document.querySelectorAll('[no_af_hide]');
  console.log('Elements with no_af_hide attribute:', noAfHideElements);

  // Elements with "no_af_remove" attribute
  const noAfRemoveElements = document.querySelectorAll('[no_af_remove]');
  console.log('Elements with no_af_remove attribute:', noAfRemoveElements);

  // Check conditions and apply styles accordingly
  if (
    isMotionSensorsEnabled &&
    isOrientationSensorsEnabled &&
    isAFrameSupported
  ) {
    console.log('All conditions met. Applying styles for "yes" elements.');
    // Apply styles for "yes" elements
    applyStyles(yesAfHideElements, 'hidden', '');
    applyStyles(yesAfRemoveElements, 'visible', 'none');
  } else {
    console.log('Conditions not met. Applying styles for "no" elements.');
    // Apply styles for "no" elements
    applyStyles(noAfHideElements, 'hidden', '');
    applyStyles(noAfRemoveElements, 'visible', 'none');
  }
});
