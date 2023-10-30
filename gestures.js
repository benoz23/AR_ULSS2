AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    movementFactor: { default: 3 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);

    this.isVisible = false;
    this.initialPosition = this.el.object3D.position.clone();
    this.scaleFactor = 1;
    this.swipeThreshold = 0.1;

    // Define the entities to switch between
    this.entities = [];
    this.currentEntityIndex = 0;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
      // If the scene is locked, show the content even when the marker is lost
      if (this.isSceneLocked) {
        this.el.object3D.visible = true;
      }
    });

    // Lock state
    this.isSceneLocked = false;
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleMovement);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.addEventListener("swipe", this.handleSwipe);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleMovement);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.removeEventListener("swipe", this.handleSwipe);
    }

    // Get the entities to switch between
    this.entities = this.el.sceneEl.querySelectorAll('[gesture-handler]');

    // Add an event listener to the lock button
    const lockButton = document.getElementById("lockButton");
    if (lockButton) {
      lockButton.addEventListener("click", () => {
        this.toggleSceneLock();
      });
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleMovement);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    this.el.sceneEl.removeEventListener("swipe", this.handleSwipe);
  },

  handleMovement: function (event) {
    if (this.isVisible && !this.isSceneLocked) {
      this.el.object3D.position.x +=
        event.detail.positionChange.x * this.data.movementFactor;
      this.el.object3D.position.z +=
        event.detail.positionChange.y * this.data.movementFactor;
    }
  },

  handleScale: function (event) {
    if (this.isVisible && !this.isSceneLocked) {
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

  handleSwipe: function (event) {
    if (this.isVisible && !this.isSceneLocked) {
      const swipeDirection = event.detail.direction;
      if (swipeDirection === "left") {
        // Switch to the next entity
        this.showEntity(this.currentEntityIndex + 1);
      } else if (swipeDirection === "right") {
        // Switch to the previous entity
        this.showEntity(this.currentEntityIndex - 1);
      }
    }
  },

  toggleSceneLock: function () {
    // Toggle the scene lock status
    this.isSceneLocked = !this.isSceneLocked;

    // If the scene is locked, show the content even when the marker is lost
    if (this.isSceneLocked) {
      this.el.object3D.visible = true;
    }

    // Update the lock button text
    const lockButton = document.getElementById("lockButton");
    if (lockButton) {
      lockButton.innerText = this.isSceneLocked ? "Unlock Scene" : "Lock Scene";
    }
  },

  showEntity: function (entityIndex) {
    if (entityIndex >= 0 && entityIndex < this.entities.length) {
      // Hide the current entity
      this.entities[this.currentEntityIndex].setAttribute("visible", false);

      // Show the new entity
      this.entities[entityIndex].setAttribute("visible", true);

      // Update the current entity index
      this.currentEntityIndex = entityIndex;
    }
  },
});

// Component that detects and emits events for touch gestures

AFRAME.registerComponent("gesture-detector", {
  schema: {
    element: { default: "" }
  },

  init: function() {
    this.targetElement =
      this.data.element && document.querySelector(this.data.element);

    if (!this.targetElement) {
      this.targetElement = this.el;
    }

    this.internalState = {
      previousState: null
    };

    this.emitGestureEvent = this.emitGestureEvent.bind(this);

    this.targetElement.addEventListener("touchstart", this.emitGestureEvent);

    this.targetElement.addEventListener("touchend", this.emitGestureEvent);

    this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
  },

  remove: function() {
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

          y: currentState.position.y - previousState.position.y
        }
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

  getTouchState: function(event) {
    if (event.touches.length === 0) {
      return null;
    }

    // Convert event.touches to an array so we can use reduce

    const touchList = [];

    for (let i = 0; i < event.touches.length; i++) {
      touchList.push(event.touches[i]);
    }

    const touchState = {
      touchCount: touchList.length
    };

    // Calculate center of all current touches

    const centerPositionRawX =
      touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
      touchList.length;

    const centerPositionRawY =
      touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
      touchList.length;

    touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };

    // Scale touch position and spread by average of window dimensions

    const screenScale = 2 / (window.innerWidth + window.innerHeight);

    touchState.position = {
      x: centerPositionRawX * screenScale,
      y: centerPositionRawY * screenScale
    };

    // Calculate average spread of touches from the center point

    if (touchList.length >= 2) {
      const spread =
        touchList.reduce((sum, touch) => {
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
  }
});