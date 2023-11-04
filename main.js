document.getElementById('prev-button').onclick = function() {
    document.querySelector('#container').emit('prevButtonClick');
};

document.getElementById('next-button').onclick = function() {
    document.querySelector('#container').emit('nextButtonClick');
};
