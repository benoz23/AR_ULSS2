document.addEventListener("DOMContentLoaded", function () {
  // Function to check if sensors are present and enabled and A-Frame is supported
  function isSensorsAndAFrameSupported() {
      // Check if A-Frame is supported
      if (!window.AFRAME) {
          return false;
      }

      // Check if sensors are present and enabled
      if (!navigator.permissions || !navigator.permissions.query || !AFRAME.scenes.length) {
          return false;
      }

      return true;
  }

  // Function to apply styles based on conditions
  function applyStyles() {
      var elementsToHide = document.querySelectorAll('[yes_af_hide]');
      var elementsToRemove = document.querySelectorAll('[yes_af_remove]');
      var elementsNoHide = document.querySelectorAll('[no_af_hide]');
      var elementsNoRemove = document.querySelectorAll('[no_af_remove]');

      if (isSensorsAndAFrameSupported()) {
          for (const element of elementsToHide) {
              element.style.visibility = 'hidden';
          }

          for (const element of elementsToRemove) {
              element.style.display = 'none';
          }
      } else {
          for (const element of elementsNoHide) {
              element.style.visibility = 'hidden';
          }

          for (const element of elementsNoRemove) {
              element.style.display = 'none';
          }
      }
  }

  // Call the function when the DOM content has finished loading
  applyStyles();
});
