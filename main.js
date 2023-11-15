document.addEventListener("DOMContentLoaded", function () {
    // Check if A-frame is supported
    const aFrameSupported = typeof AFRAME !== "undefined";
    console.log("A-frame supported:", aFrameSupported);

    let sensorsEnabled = false;
    let stylesApplied = false; // Flag to track whether styles have been applied

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

            if (hasValidRotationRate) {
                sensorsEnabled = true;
                console.log("Gyroscope present.");

                // Check if A-frame is supported after gyroscope detection
                if (!aFrameSupported || !sensorsEnabled) {
                    if (!stylesApplied) {
                        applyStyles(".if-no-sup-remove", "display: block");
                        applyStyles(".if-no-sup-hide", "visibility: hidden");

                        applyStyles(".if-sup-remove", "display: none");
                        applyStyles(".if-sup-hide", "visibility: hidden");

                        console.log("Fallback: Showing elements with class 'if-no-sup-remove' and hiding 'if-no-sup-hide'.");
                        stylesApplied = true;
                    }
                } else {
                    if (!stylesApplied) {
                        applyStyles(".if-sup-remove", "display: block");
                        applyStyles(".if-sup-hide", "visibility: hidden");

                        applyStyles(".if-no-sup-remove", "display: none");
                        applyStyles(".if-no-sup-hide", "visibility: hidden");

                        console.log("Applying styles for 'if-sup-remove' and 'if-sup-hide'.");
                        stylesApplied = true;
                    }
                }
            } else {
                console.log("Gyroscope not present or invalid rotationRate values.");

                if (!stylesApplied) {
                    applyStyles(".if-no-sup-remove", "display: block");
                    applyStyles(".if-no-sup-hide", "visibility: hidden");

                    applyStyles(".if-sup-remove", "display: none");
                    applyStyles(".if-sup-hide", "visibility: hidden");

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

        if (!stylesApplied) {
            applyStyles(".if-no-sup-remove", "display: block");
            applyStyles(".if-no-sup-hide", "visibility: hidden");

            applyStyles(".if-sup-remove", "display: none");
            applyStyles(".if-sup-hide", "visibility: hidden");

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
