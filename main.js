document.addEventListener("DOMContentLoaded", function () {
  // Check if sensors are present and enabled
  let sensorsEnabled = false;

  if ('DeviceMotionEvent' in window) {
      window.addEventListener("devicemotion", function (event) {
          if (event.rotationRate && (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)) {
              sensorsEnabled = true;
          }
      });
  } else {
      console.log("DeviceMotionEvent is not supported on this device.");
  }

  // Check if A-frame is supported
  const aFrameSupported = typeof AFRAME !== "undefined";
  console.log("A-frame supported:", aFrameSupported);

  if (!sensorsEnabled || !aFrameSupported) {
      // Apply styles to elements with attributes "no_af_hide" and "no_af_remove"
      applyStyles("[no_af_hide]", "visibility: hidden");
      applyStyles("[no_af_remove]", "display: none");
  } else {
      // Apply styles to elements with attributes "yes_af_hide" and "yes_af_remove"
      applyStyles("[yes_af_hide]", "visibility: hidden");
      applyStyles("[yes_af_remove]", "display: none");
  }
});

function applyStyles(selector, styles) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
      element.style.cssText += ";" + styles;
  });
}
