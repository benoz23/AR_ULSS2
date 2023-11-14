document.addEventListener('DOMContentLoaded', function() {
  // Check if sensors are present and enabled
  const hasSensors = navigator.sensors && navigator.sensors.enabled;

  // Check if A-Frame is supported
  const hasAFrame = typeof AFrame !== 'undefined';

  // Apply visibility or display styles based on the conditions
  const yesAfHideElements = document.querySelectorAll('[yes_af_hide]');
  const yesAfRemoveElements = document.querySelectorAll('[yes_af_remove]');
  const noAfHideElements = document.querySelectorAll('[no_af_hide]');
  const noAfRemoveElements = document.querySelectorAll('[no_af_remove]');

  if (hasSensors && hasAFrame) {
    for (const element of yesAfHideElements) {
      element.style.visibility = 'hidden';
    }

    for (const element of yesAfRemoveElements) {
      element.style.display = 'none';
    }
  } else {
    for (const element of noAfHideElements) {
      element.style.visibility = 'hidden';
    }

    for (const element of noAfRemoveElements) {
      element.style.display = 'none';
    }
  }
});
