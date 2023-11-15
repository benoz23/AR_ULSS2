document.addEventListener("DOMContentLoaded", function () {
    // Check if A-frame is supported
    const aFrameSupported = typeof AFRAME !== "undefined";
    console.log("A-frame supported:", aFrameSupported);

    let sensorsEnabled = false;
    let stylesApplied = false;

    function handleDeviceMotionEvent(event) {
        console.log("DeviceMotionEvent received:", event);

        // Check if rotationRate data is present
        if (event.rotationRate) {
            // Check if all rotationRate values are not null, undefined, or zero
            const hasValidRotationRate = (
                event.rotationRate.alpha !== null &&
                event.rotationRate.beta !== null &&
                event.rotationRate.gamma !== null &&
                event.rotationRate.alpha !== 0 &&
                event.rotationRate.beta !== 0 &&
                event.rotationRate.gamma !== 0
            );

            console.log("Has valid rotationRate:", hasValidRotationRate);

            if (hasValidRotationRate) {
                sensorsEnabled = true;
                console.log("Gyroscope present.");

                // Check if A-frame is supported after gyroscope detection
                if (!aFrameSupported || !sensorsEnabled) {
                    if (!stylesApplied) {
                        // Apply styles to elements with class "if-no-sup-hide" and "if-no-sup-remove"
                        applyStyles(".if-no-sup-hide", "visibility: hidden");
                        applyStyles(".if-no-sup-remove", "display: none");
                        applyStyles(".if-sup-hide", "visibility: visible");
                        applyStyles(".if-sup-remove", "display: block");
                        console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
                        stylesApplied = true;
                    }
                } else {
                    if (!stylesApplied) {
                        // Apply styles to elements with class "if-sup-hide" and "if-sup-remove"
                        applyStyles(".if-sup-hide", "visibility: hidden");
                        applyStyles(".if-sup-remove", "display: none");
                        applyStyles(".if-no-sup-hide", "visibility: visible");
                        applyStyles(".if-no-sup-remove", "display: block");
                        console.log("Applying styles for 'if-sup-hide' and 'if-sup-remove'.");
                        stylesApplied = true;
                    }
                }
            } else {
                // Gyroscope data is not present or all values are null, undefined, or zero
                console.log("Gyroscope not present or invalid rotationRate values.");

                // Apply styles to elements with class "if-no-sup-hide" and "if-no-sup-remove"
                if (!stylesApplied) {
                    applyStyles(".if-no-sup-hide", "visibility: hidden");
                    applyStyles(".if-no-sup-remove", "display: none");
                    applyStyles(".if-sup-hide", "visibility: visible");
                    applyStyles(".if-sup-remove", "display: block");
                    console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
                    stylesApplied = true;
                }
            }

            // Remove the event listener after handling the event
            window.removeEventListener("devicemotion", handleDeviceMotionEvent);
        }
    }

    if ('DeviceMotionEvent' in window) {
        window.addEventListener("devicemotion", handleDeviceMotionEvent);
    } else {
        console.log("DeviceMotionEvent is not supported on this device.");

        // Apply styles to elements with class "if-no-sup-hide" and "if-no-sup-remove" if sensors are not supported
        if (!stylesApplied) {
            applyStyles(".if-no-sup-hide", "visibility: hidden");
            applyStyles(".if-no-sup-remove", "display: none");
            applyStyles(".if-sup-hide", "visibility: visible");
            applyStyles(".if-sup-remove", "display: block");
            console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
            stylesApplied = true;
        }
    }
});

function applyStyles(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.style.cssText += ";" + styles;
    });
}