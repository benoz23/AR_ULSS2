// Function to handle device capabilities based on A-Frame presence and sensor availability
function handleDeviceCapabilities(isAFramePresent, hasMotionSensors, hasOrientationSensors) {
  const hideSelector = isAFramePresent ? '[yes_af_hide]' : '[no_af_hide]';
  const removeSelector = isAFramePresent ? '[yes_af_remove]' : '[no_af_remove]';

  const hideElements = document.querySelectorAll(hideSelector);
  const removeElements = document.querySelectorAll(removeSelector);

  if (hasMotionSensors || hasOrientationSensors) {
    hideElements.forEach(element => element.style.visibility = 'hidden');
    removeElements.forEach(element => element.style.display = 'none');
  } else {
    console.log('Neither motion nor orientation sensors detected');
  }
}

// Check for device motion sensors
const hasMotionSensors = 'ondevicemotion' in window;

if (hasMotionSensors) {
  // Attach event listener for device motion
  window.addEventListener('devicemotion', function (event) {
    if (event.accelerationIncludingGravity) {
      console.log('Motion sensors enabled');
      handleDeviceCapabilities(typeof AFRAME !== 'undefined', true, false);
    } else {
      console.log('Motion sensors not enabled');
      handleDeviceCapabilities(typeof AFRAME !== 'undefined', false, false);
    }
  });
} else {
  console.log('Device Motion API not supported or no motion sensors detected');
  handleDeviceCapabilities(typeof AFRAME !== 'undefined', false, false);
}

// Check for device orientation sensors
const hasOrientationSensors = 'ondeviceorientation' in window;

if (hasOrientationSensors) {
  // Attach event listener for device orientation
  window.addEventListener('deviceorientation', function (event) {
    if (event.alpha !== null || event.beta !== null || event.gamma !== null) {
      console.log('Orientation sensors enabled');
      handleDeviceCapabilities(typeof AFRAME !== 'undefined', true, true);
    } else {
      console.log('Orientation sensors not enabled');
      handleDeviceCapabilities(typeof AFRAME !== 'undefined', true, false);
    }
  });
} else {
  console.log('Device Orientation API not supported or no orientation sensors detected');
  handleDeviceCapabilities(typeof AFRAME !== 'undefined', false, false);
}
