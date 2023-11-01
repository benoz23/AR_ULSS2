var currentChildIndex = 0;
var children = document.querySelector('#marker-1').children;

function changeChild(offset) {
    children[currentChildIndex].setAttribute('visible', 'false');
    currentChildIndex += offset;
    if (currentChildIndex < 0) {
        currentChildIndex = 0;
    }
    if (currentChildIndex >= children.length) {
        currentChildIndex = children.length - 1;
    }
    children[currentChildIndex].setAttribute('visible', 'true');
}
