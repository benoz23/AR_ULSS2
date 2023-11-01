var marker = document.querySelector("a-marker");
var entityList = marker.querySelectorAll("a-entity:not([camera])"); // Exclude entities with the "camera" attribute
var currentEntityIndex = 0;
var prevButton = document.getElementById("prev-button");
var nextButton = document.getElementById("next-button");

// Initialize, show the first entity, and hide the rest
entityList.forEach(function (entity, index) {
    if (index === currentEntityIndex) {
        entity.setAttribute("visible", true);
    } else {
        entity.setAttribute("visible", false);
    }
});

// Show the next entity
nextButton.addEventListener("click", function () {
    if (currentEntityIndex < entityList.length - 1) {
        entityList[currentEntityIndex].setAttribute("visible", false);
        currentEntityIndex++;
        entityList[currentEntityIndex].setAttribute("visible", true);
    }
});

// Show the previous entity
prevButton.addEventListener("click", function () {
    if (currentEntityIndex > 0) {
        entityList[currentEntityIndex].setAttribute("visible", false);
        currentEntityIndex--;
        entityList[currentEntityIndex].setAttribute("visible", true);
    }
});
