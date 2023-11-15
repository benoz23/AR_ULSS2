document.addEventListener("DOMContentLoaded", function () {
    // Check if A-frame is supported
    const aFrameSupported = typeof AFRAME !== "undefined";
    console.log("A-frame supported:", aFrameSupported);

    let sensorsEnabled = false;

    if ('DeviceMotionEvent' in window) {
        window.addEventListener("devicemotion", function (event) {
            console.log("DeviceMotionEvent received:", event);
            if (event.rotationRate && (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)) {
                sensorsEnabled = true;
                console.log("Gyroscope present.");

                // Check if A-frame is supported after gyroscope detection
                if (!aFrameSupported || !sensorsEnabled) {
                    // Apply styles to elements with class "no_af_hide" and "no_af_remove"
                    applyStyles(".if-no-sup-hide", "visibility: hidden");
                    applyStyles(".if-no-sup-remove", "display: none");
                    applyStyles(".if-sup-hide", "visibility: visible");
                    applyStyles(".if-sup-remove", "display: block");
                    console.log("Fallback: Showing elements with class 'no_af_remove' and hiding 'no_af_hide'.");
                } else {
                    // Apply styles to elements with class "yes_af_hide" and "yes_af_remove"
                    applyStyles(".if-sup-hide", "visibility: hidden");
                    applyStyles(".if-sup-remove", "display: none");
                    applyStyles(".if-no-sup-hide", "visibility: visible");
                    applyStyles(".if-no-sup-remove", "display: block");
                    console.log("Applying styles for 'yes_af_hide' and 'yes_af_remove'.");
                }
            }
        });
    } else {
        console.log("DeviceMotionEvent is not supported on this device.");

        // Apply styles to elements with class "no_af_hide" and "no_af_remove" if sensors are not supported
        applyStyles(".if-no-sup-hide", "visibility: hidden");
        applyStyles(".if-no-sup-remove", "display: none");
        applyStyles(".if-sup-hide", "visibility: visible");
        applyStyles(".if-sup-remove", "display: block");
        console.log("Fallback: Showing elements with class 'no_af_remove' and hiding 'no_af_hide'.");
    }
});

function applyStyles(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.style.cssText += ";" + styles;
    });
}
