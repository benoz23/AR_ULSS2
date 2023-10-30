var entityList = document.querySelectorAll("a-entity");
var currentEntityIndex = 0;
var prevButton = document.getElementById("prev-button");
var nextButton = document.getElementById("next-button");

// Function to animate an entity to move it out of the viewport to the right
function animateEntityOut(entity) {
    entity.setAttribute("animation", {
        property: "position",
        to: `${window.innerWidth} 0 0`,
        dur: 500, // Animation duration in milliseconds
        easing: "linear"
    });
    entity.setAttribute("visible", false);
}

// Function to animate an entity to move it into the viewport from the left
function animateEntityIn(entity) {
    entity.setAttribute("animation", {
        property: "position",
        to: "0 0 0",
        dur: 500, // Animation duration in milliseconds
        easing: "linear"
    });
    entity.setAttribute("visible", true);
}

// Initialize, show the first entity, and hide the rest
entityList.forEach(function (entity, index) {
    if (!entity.getAttribute("camera")) {
        if (index === currentEntityIndex) {
            entity.setAttribute("visible", true);
        } else {
            animateEntityOut(entity);
        }
    }
});

// Show the next entity with animation
nextButton.addEventListener("click", function () {
    if (currentEntityIndex < entityList.length - 1) {
        animateEntityOut(entityList[currentEntityIndex]);
        do {
            currentEntityIndex++;
        } while (currentEntityIndex < entityList.length && entityList[currentEntityIndex].getAttribute("camera"));
        if (currentEntityIndex < entityList.length) {
            animateEntityIn(entityList[currentEntityIndex]);
        }
    }
});

// Show the previous entity with animation
prevButton.addEventListener("click", function () {
    if (currentEntityIndex > 0) {
        animateEntityOut(entityList[currentEntityIndex]);
        do {
            currentEntityIndex--;
        } while (currentEntityIndex >= 0 && entityList[currentEntityIndex].getAttribute("camera"));
        if (currentEntityIndex >= 0) {
            animateEntityIn(entityList[currentEntityIndex]);
        }
    }
});
