document.addEventListener("DOMContentLoaded", function () {
  // Check if sensors are present and enabled
  let sensorsEnabled = false;

  if ('accelerometer' in window && 'gyroscope' in window) {
      // Check permissions only if the sensor APIs are present
      navigator.permissions.query({ name: "accelerometer" }).then((result) => {
          console.log("Accelerometer permission state:", result.state);
          if (result.state === "granted") {
              sensorsEnabled = true;
          }
      }).catch((error) => {
          console.error("Error checking accelerometer permission:", error);
      });

      navigator.permissions.query({ name: "gyroscope" }).then((result) => {
          console.log("Gyroscope permission state:", result.state);
          if (result.state === "granted") {
              sensorsEnabled = true;
          }
      }).catch((error) => {
          console.error("Error checking gyroscope permission:", error);
      });
  } else {
      console.log("Accelerometer and gyroscope not supported on this device.");
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
