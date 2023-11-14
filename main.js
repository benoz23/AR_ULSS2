document.addEventListener('DOMContentLoaded', function () {
    var elementsToHide = [];
    var elementsToRemove = [];
  
    if (typeof AFRAME === 'undefined') {
      // A-Frame is not supported
      elementsToHide = document.querySelectorAll('[no_af_hide]');
      elementsToRemove = document.querySelectorAll('[no_af_remove]');
    } else {
      // A-Frame is supported
      elementsToHide = document.querySelectorAll('[yes_af_hide]');
      elementsToRemove = document.querySelectorAll('[yes_af_remove]');
    }
  
    // Apply CSS styles to elements with "visibility: hidden"
    elementsToHide.forEach(function (element) {
      element.style.visibility = 'hidden';
    });
  
    // Apply CSS styles to elements with "display: none"
    elementsToRemove.forEach(function (element) {
      element.style.display = 'none';
    });
  });
  