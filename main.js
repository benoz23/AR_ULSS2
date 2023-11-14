document.addEventListener("DOMContentLoaded", function () {
  // Check if the Device Motion API is supported
  const isDeviceMotionSupported = 'DeviceMotionEvent' in window;
  console.log('Device Motion API Supported:', isDeviceMotionSupported);

  // Function to request motion sensor permission
  async function requestMotionPermission() {
    try {
      // Use polyfill if native method is not available
      if (!DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission = function () {
          console.log('Using polyfill for DeviceMotionEvent.requestPermission()');
          return Promise.resolve(true);
        };
      }

      // Request permission using native method or polyfill
      await DeviceMotionEvent.requestPermission();
      return true;
    } catch (error) {
      console.error('Motion sensor permission denied:', error);
      return false;
    }
  }

  // Check if motion sensors are enabled
  async function checkMotionSensors() {
    if (isDeviceMotionSupported) {
      const motionPermission = await requestMotionPermission();
      console.log('Motion Sensors Enabled:', motionPermission);
      return motionPermission;
    } else {
      console.log('Motion Sensors not supported.');
      return false;
    }
  }

  // Check if the Device Orientation API is supported
  const isDeviceOrientationSupported = 'DeviceOrientationEvent' in window;
  console.log('Device Orientation API Supported:', isDeviceOrientationSupported);

  // Function to request orientation sensor permission
  async function requestOrientationPermission() {
    try {
      // Use polyfill if native method is not available
      if (!DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission = function () {
          console.log('Using polyfill for DeviceOrientationEvent.requestPermission()');
          return Promise.resolve(true);
        };
      }

      // Request permission using native method or polyfill
      await DeviceOrientationEvent.requestPermission();
      return true;
    } catch (error) {
      console.error('Orientation sensor permission denied:', error);
      return false;
    }
  }

  // Check if orientation sensors are enabled
  async function checkOrientationSensors() {
    if (isDeviceOrientationSupported) {
      const orientationPermission = await requestOrientationPermission();
      console.log('Orientation Sensors Enabled:', orientationPermission);
      return orientationPermission;
    } else {
      console.log('Orientation Sensors not supported.');
      return false;
    }
  }

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
  async function checkAndApplyStyles() {
    const motionSensorsEnabled = await checkMotionSensors();
    const orientationSensorsEnabled = await checkOrientationSensors();

    if (motionSensorsEnabled && orientationSensorsEnabled && isAFrameSupported) {
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
  }

  // Execute the check and apply styles
  checkAndApplyStyles();
});