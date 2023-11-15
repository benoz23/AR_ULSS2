document.addEventListener("DOMContentLoaded", function () {
    // Check if A-frame is supported
    const aFrameSupported = typeof AFRAME !== "undefined";
    console.log("A-frame supported:", aFrameSupported);

    let sensorsEnabled = false;

    if ('DeviceMotionEvent' in window) {
        window.addEventListener("devicemotion", function (event) {
            console.log("DeviceMotionEvent received:", event);
            
            // Check if rotationRate data is present and non-zero
            if (event.rotationRate && (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)) {
                sensorsEnabled = true;
                console.log("Gyroscope present.");

                // Check if A-frame is supported after gyroscope detection
                if (!aFrameSupported || !sensorsEnabled) {
                    // Apply styles to elements with class "if-no-sup-hide" and "if-no-sup-remove"
                    applyStyles(".if-no-sup-hide", "visibility: hidden");
                    applyStyles(".if-no-sup-remove", "display: none");
                    applyStyles(".if-sup-hide", "visibility: visible");
                    applyStyles(".if-sup-remove", "display: block");
                    console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
                } else {
                    // Apply styles to elements with class "if-sup-hide" and "if-sup-remove"
                    applyStyles(".if-sup-hide", "visibility: hidden");
                    applyStyles(".if-sup-remove", "display: none");
                    applyStyles(".if-no-sup-hide", "visibility: visible");
                    applyStyles(".if-no-sup-remove", "display: block");
                    console.log("Applying styles for 'if-sup-hide' and 'if-sup-remove'.");
                }
            } else {
                // Gyroscope data is not present
                console.log("Gyroscope not present.");
                
                // Apply styles to elements with class "if-no-sup-hide" and "if-no-sup-remove"
                applyStyles(".if-no-sup-hide", "visibility: hidden");
                applyStyles(".if-no-sup-remove", "display: none");
                applyStyles(".if-sup-hide", "visibility: visible");
                applyStyles(".if-sup-remove", "display: block");
                console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
            }
        });
    } else {
        console.log("DeviceMotionEvent is not supported on this device.");

        // Apply styles to elements with class "if-no-sup-hide" and "if-no-sup-remove" if sensors are not supported
        applyStyles(".if-no-sup-hide", "visibility: hidden");
        applyStyles(".if-no-sup-remove", "display: none");
        applyStyles(".if-sup-hide", "visibility: visible");
        applyStyles(".if-sup-remove", "display: block");
        console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
    }
});

function applyStyles(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.style.cssText += ";" + styles;
    });
}