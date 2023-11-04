document.getElementById('prev-button').onclick = function() {
    document.querySelector('#camera').emit('prevButtonClick');
};

document.getElementById('next-button').onclick = function() {
    document.querySelector('#camera').emit('nextButtonClick');
};
