// Ottenere un riferimento all'elemento container
var container = document.querySelector('#container');

// Ottenere un riferimento agli elementi prev e next
var prevButton = document.querySelector('#prev-button');
var nextButton = document.querySelector('#next-button');

// Aggiungere un gestore per il pulsante "prev"
prevButton.addEventListener('click', function () {
  container.setAttribute('animation__prev', {
    property: 'position',
    to: {x: 0.4, y: 1.525, z: -0.15},
    startEvents: 'click_prev'
  });
  container.emit('click_prev', null, false);
});

// Aggiungere un gestore per il pulsante "next"
nextButton.addEventListener('click', function () {
  container.setAttribute('animation__next', {
    property: 'position',
    to: {x: 0.4, y: 1.525, z: -0.15},
    startEvents: 'click_next'
  });
  container.emit('click_next', null, false);
});
