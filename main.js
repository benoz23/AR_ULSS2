// JavaScript
const container = document.getElementById('container');

// Funzione per animare il container
function animateContainer(toPosition) {
    container.setAttribute('animation__001', {
        property: 'position',
        to: toPosition,
        startEvents: 'click_next'
    });
    container.emit('click_next', null, false);
}

// Gestione dei pulsanti "prev" e "next"
function prev() {
    const toPosition = { x: -0.4, y: 1.525, z: -0.15 };
    animateContainer(toPosition);
}

function next() {
    const toPosition = { x: +0.4, y: 1.525, z: -0.15 };
    animateContainer(toPosition);
}
