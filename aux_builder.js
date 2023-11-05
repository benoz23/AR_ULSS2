// Get the container and camera elements
const container = document.querySelector('#container');
const camera = document.querySelector('#camera');

// Get all container children
const containerChildren = container.querySelectorAll('.container-child');

// Disable prev and next buttons before the check is done
document.getElementById('prev-button').disabled = true;
document.getElementById('next-button').disabled = true;

// Check for children with width > height
for (const child of containerChildren) {
    const childWidth = child.offsetWidth;
    const childHeight = child.offsetHeight;

    if (childWidth > childHeight) {
        // Create two auxiliary empty a-entity elements
        const aux1 = document.createElement('a-entity');
        aux1.classList.add('container-child');

        const aux2 = document.createElement('a-entity');
        aux2.classList.add('container-child');

        // Set the positions of the auxiliary entities
        const childPosition = child.getAttribute('position');
        const childX = parseFloat(childPosition.x);
        const childY = parseFloat(childPosition.y);
        const childZ = parseFloat(childPosition.z);

        aux1.setAttribute('position', `${childX - childWidth / 6} ${childY} ${childZ + 0.175}`);
        aux2.setAttribute('position', `${childX + childWidth / 6} ${childY} ${childZ + 0.175}`);

        // Insert the auxiliary entities into the container
        container.insertBefore(aux1, child.nextSibling);
        container.insertBefore(aux2, child.nextSibling);
    }
}
