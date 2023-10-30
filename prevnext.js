var entityList = document.querySelectorAll("a-entity");
var currentEntityIndex = 0;
var prevButton = document.getElementById("prev-button");
var nextButton = document.getElementById("next-button");

// Initialize, show the first entity, and hide the rest
entityList.forEach(function (entity, index) {
    if (!entity.getAttribute("camera")) {
        if (index === currentEntityIndex) {
            entity.setAttribute("visible", true);
        } else {
            entity.setAttribute("visible", false);
        }
    }
});

// Show the next entity
nextButton.addEventListener("click", function () {
    if (currentEntityIndex < entityList.length - 1) {
        entityList[currentEntityIndex].setAttribute("visible", false);
        do {
            currentEntityIndex++;
        } while (currentEntityIndex < entityList.length && entityList[currentEntityIndex].getAttribute("camera"));
        if (currentEntityIndex < entityList.length) {
            entityList[currentEntityIndex].setAttribute("visible", true);
        }
    }
});

// Show the previous entity
prevButton.addEventListener("click", function () {
    if (currentEntityIndex > 0) {
        entityList[currentEntityIndex].setAttribute("visible", false);
        do {
            currentEntityIndex--;
        } while (currentEntityIndex >= 0 && entityList[currentEntityIndex].getAttribute("camera"));
        if (currentEntityIndex >= 0) {
            entityList[currentEntityIndex].setAttribute("visible", true);
        }
    }
});