document.addEventListener('DOMContentLoaded', function() {
  console.log('Checking for sensors and A-Frame support');

  // Check if sensors are present and enabled
  const hasSensors = navigator.sensors && navigator.sensors.enabled;
  console.log('Sensors present and enabled:', hasSensors);

  // Check if A-Frame is supported
  const hasAFrame = typeof AFrame !== 'undefined';
  console.log('A-Frame supported:', hasAFrame);

  // Apply visibility or display styles based on the conditions
  const yesAfHideElements = document.querySelectorAll('[yes_af_hide]');
  console.log('Number of elements with yes_af_hide attribute:', yesAfHideElements.length);

  const yesAfRemoveElements = document.querySelectorAll('[yes_af_remove]');
  console.log('Number of elements with yes_af_remove attribute:', yesAfRemoveElements.length);

  const noAfHideElements = document.querySelectorAll('[no_af_hide]');
  console.log('Number of elements with no_af_hide attribute:', noAfHideElements.length);

  const noAfRemoveElements = document.querySelectorAll('[no_af_remove]');
  console.log('Number of elements with no_af_remove attribute:', noAfRemoveElements.length);

  if (hasSensors && hasAFrame) {
    console.log('Applying visibility or display styles for A-Frame enabled scenario');

    for (const element of yesAfHideElements) {
      element.style.visibility = 'hidden';
      console.log('Applying visibility: hidden to element:', element);
    }

    for (const element of yesAfRemoveElements) {
      element.style.display = 'none';
      console.log('Applying display: none to element:', element);
    }
  } else {
    console.log('Applying visibility or display styles for A-Frame fallback');

    for (const element of noAfHideElements) {
      element.style.visibility = 'hidden';
      console.log('Applying visibility: hidden to element:', element);
    }

    for (const element of noAfRemoveElements) {
      element.style.display = 'none';
      console.log('Applying display: none to element:', element);
    }
  }
});
