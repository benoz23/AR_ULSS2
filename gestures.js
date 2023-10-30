/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    movementFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleMovement = this.handleMovement.bind(this);

    this.isVisible = false;
    this.initialPosition = this.el.object3D.position.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
    
    // Store references to all child entities
    this.childEntities = this.el.children;

    // Current active entity index
    this.activeEntityIndex = 0;

    // Swipe gesture threshold
    this.swipeThreshold = 0.1;

    // Store the initial touch position for swipe gesture
    this.initialTouchX = 0;

    // Listen for swipe gesture events
    this.el.sceneEl.addEventListener("onefingermove", this.handleSwipe);
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleMovement);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleMovement);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleMovement);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleMovement: function (event) {
    if (this.isVisible) {
      this.el.object3D.position.x +=
        event.detail.positionChange.x * this.data.movementFactor;
      this.el.object3D.position.z +=
        event.detail.positionChange.y * this.data.movementFactor;
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor;
      this.el.object3D.scale.y = this.scaleFactor;
      this.el.object3D.scale.z = this.scaleFactor;
    }
  },

  // Handle swipe gesture to switch between child entities
  handleSwipe: function (event) {
    if (this.isVisible) {
      if (event.detail.normalizedX > this.swipeThreshold) {
        // Swipe right, go to the next entity
        this.activeEntityIndex = (this.activeEntityIndex + 1) % this.childEntities.length;
        this.switchActiveEntity();
      } else if (event.detail.normalizedX < -this.swipeThreshold) {
        // Swipe left, go to the previous entity
        this.activeEntityIndex = (this.activeEntityIndex - 1 + this.childEntities.length) % this.childEntities.length;
        this.switchActiveEntity();
      }
    }
  },

  // Helper function to switch to the active entity
  switchActiveEntity: function () {
    for (let i = 0; i < this.childEntities.length; i++) {
      const childEntity = this.childEntities[i];
      if (i === this.activeEntityIndex) {
        childEntity.setAttribute("visible", true);
      } else {
        childEntity.setAttribute("visible", false);
      }
    }
  },
});

// Component that detects and emits events for touch gestures

AFRAME.registerComponent("gesture-detector", {
  schema: {
    element: { default: "" },
  },

  init: function () {
    this.targetElement =
      this.data.element && document.querySelector(this.data.element);

    if (!this.targetElement) {
      this.targetElement = this.el;
    }

    this.internalState = {
      previousState: null,
    };

    this.emitGestureEvent = this.emitGestureEvent.bind(this);

    this.targetElement.addEventListener("touchstart", this.emitGestureEvent);
    this.targetElement.addEventListener("touchend", this.emitGestureEvent);
    this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
  },

  remove: function () {
    this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);
    this.targetElement.removeEventListener("touchend", this.emitGestureEvent);
    this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
  },

  emitGestureEvent(event) {
    const currentState = this.getTouchState(event);

    const previousState = this.internalState.previousState;

    const gestureContinues =
      previousState &&
      currentState &&
      currentState.touchCount == previousState.touchCount;

    const gestureEnded = previousState && !gestureContinues;

    const gestureStarted = currentState && !gestureContinues;

    if (gestureEnded) {
      const eventName =
        this.getEventPrefix(previousState.touchCount) + "fingerend";

      this.el.emit(eventName, previousState);

      this.internalState.previousState = null;
    }

    if (gestureStarted) {
      currentState.startTime = performance.now();
      currentState.startPosition = currentState.position;
      currentState.startSpread = currentState.spread;
      const eventName =
        this.getEventPrefix(currentState.touchCount) + "fingerstart";
      this.el.emit(eventName, currentState);
      this.internalState.previousState = currentState;
    }

    if (gestureContinues) {
      const eventDetail = {
        positionChange: {
          x: currentState.position.x - previousState.position.x,
          y: currentState.position.y - previousState.position.y,
        },
      };

      if (currentState.spread) {
        eventDetail.spreadChange = currentState.spread - previousState.spread;
      }

      // Update state with new data
      Object.assign(previousState, currentState);

      // Add state data to event detail
      Object.assign(eventDetail, previousState);

      const eventName =
        this.getEventPrefix(currentState.touchCount) + "fingermove";
      this.el.emit(eventName, eventDetail);
    }
  },

  getTouchState: function (event) {
    if (event.touches.length === 0) {
      return null;
    }

    // Convert event.touches to an array so we can use reduce
    const touchList = [];

    for (let i = 0; i < event.touches.length; i++) {
      touchList.push(event.touches[i]);
    }

    const touchState = {
      touchCount: touchList.length,
    };

    // Calculate the center of all current touches
    const centerPositionRawX =
      touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
      touchList.length;

    const centerPositionRawY =
      touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
      touchList.length;

    touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };

    // Scale touch position and spread by the average of window dimensions
    const screenScale = 2 / (window.innerWidth + window.innerHeight);

    touchState.position = {
      x: centerPositionRawX * screenScale,
      y: centerPositionRawY * screenScale,
    };

    // Calculate the average spread of touches from the center point
    if (touchList.length >= 2) {
      const spread = touchList.reduce((sum, touch) => {
        return (
          sum +
          Math.sqrt(
            Math.pow(centerPositionRawX - touch.clientX, 2) +
              Math.pow(centerPositionRawY - touch.clientY, 2)
          )
        );
      }, 0) / touchList.length;

      touchState.spread = spread * screenScale;
    }

    return touchState;
  },

  getEventPrefix(touchCount) {
    const numberNames = ["one", "two", "three", "many"];
    return numberNames[Math.min(touchCount, 4) - 1];
  },
});