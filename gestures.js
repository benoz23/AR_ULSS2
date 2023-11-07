/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    movementFactor: { default: 1 },
    zoomFactor: { default: 1 },
    min: { type: 'vec3', default: {x: -0.25, y: -0.15, z: 0.1} }, // Minimum position
    max: { type: 'vec3', default: {x: 1.1875, y: 0.15, z: 0.2} }  // Maximum position
  },

  init: function () {
    this.handleZoom = this.handleZoom.bind(this);
    this.handleMovementHor = this.handleMovementHor.bind(this);
    this.handleMovementVert = this.handleMovementVert.bind(this);

    this.isVisible = false;
    this.initialPosition = this.el.object3D.position.clone();
    this.containerPosition = new THREE.Vector3(); // Initialize to (0, 0, 0).

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleMovementHor);
      this.el.sceneEl.addEventListener("onefingermove", this.handleMovementVert);
      this.el.sceneEl.addEventListener("twofingermove", this.handleZoom);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleMovementHor);
      this.el.sceneEl.removeEventListener("onefingermove", this.handleMovementVert);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleZoom);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleMovementHor);
    this.el.sceneEl.removeEventListener("onefingermove", this.handleMovementVert);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleZoom);
  },

  handleMovementHor: function (event) {
    console.log("Horizontal Movement:", event.detail.positionChange.x);

    this.el.object3D.position.x -=
      event.detail.positionChange.x * this.data.movementFactor;

    // Restrict the camera's X position
    this.el.object3D.position.x = Math.min(this.data.max.x, Math.max(this.data.min.x, this.el.object3D.position.x));
  },

  handleMovementVert: function (event) {
    console.log("Vertical Movement:", event.detail.positionChange.y);

    this.el.object3D.position.y +=
      event.detail.positionChange.y * this.data.movementFactor;
    this.el.object3D.position.z -=
      event.detail.positionChange.y * this.data.movementFactor;

    // Restrict the camera's Y and Z positions
    this.el.object3D.position.y = Math.min(this.data.max.y, Math.max(this.data.min.y, this.el.object3D.position.y));
    this.el.object3D.position.z = Math.min(this.data.max.z, Math.max(this.data.min.z, this.el.object3D.position.z));
  },
    
  handleZoom: function (event) {
    console.log("Zoom:", event.detail.spreadChange);

    this.el.object3D.position.y -= event.detail.spreadChange * this.data.zoomFactor;
    this.el.object3D.position.z -= event.detail.spreadChange * this.data.zoomFactor;

    // Restrict the camera's Y and Z positions
    this.el.object3D.position.y = Math.min(this.data.max.y, Math.max(this.data.min.y, this.el.object3D.position.y));
    this.el.object3D.position.z = Math.min(this.data.max.z, Math.max(this.data.min.z, this.el.object3D.position.z));
  }
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
