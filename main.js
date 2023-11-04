document.getElementById('prev-button').onclick = function() {
    document.querySelector('#camera').setAttribute('animation__prev', {'property': 'position',
                                                                        'to': {x: parseFloat(currentPosition.x) - 0.25, y: currentPosition.y, z: currentPosition.z},                                 
                                                                        'startEvents': 'prevButtonClick');
    document.querySelector('#camera').emit('prevButtonClick');
};

document.getElementById('next-button').onclick = function() {
    document.querySelector('#camera').setAttribute('animation__next', {'property': 'position',
                                                                        'to': {x: parseFloat(currentPosition.x) + 0.25, y: currentPosition.y, z: currentPosition.z},                                 
                                                                        'startEvents': 'nextButtonClick');
    document.querySelector('#camera').emit('nextButtonClick');
};
