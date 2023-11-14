document.addEventListener('DOMContentLoaded', function () {
  // Check for device motion sensors
  const hasMotionSensors = 'ondevicemotion' in window;

  if (hasMotionSensors) {
    // Attach event listener for device motion
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
    console.log('Device Motion API not supported or no motion sensors detected');
    handleDeviceCapabilities(false);
  }

  // Check for device orientation sensors
  const hasOrientationSensors = 'ondeviceorientation' in window;

  if (hasOrientationSensors) {
    // Attach event listener for device orientation
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
    console.log('Device Orientation API not supported or no orientation sensors detected');
    handleDeviceCapabilities(false);
  }
});