document.addEventListener('DOMContentLoaded', function () {
    if (typeof AFRAME === 'undefined') {
      var toHtmlButton = document.getElementById('to-html');
      if (toHtmlButton) {
        toHtmlButton.style.display = 'block';
      }
    } else {
      var toAframeButton = document.getElementById('to-aframe');
      if (toAframeButton) {
        toAframeButton.style.display = 'block';
      }
    }
  });
  