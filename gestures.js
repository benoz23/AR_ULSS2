/* global AFRAME, THREE */

AFRAME.registerComponent('position-monitor', {
  init: function () {
    // Reference to the entity whose position you want to monitor.
    const entityToMonitor = this.el;

    // Log the initial position.
    console.log('Initial Position (x, y, z):', entityToMonitor.object3D.position.x, entityToMonitor.object3D.position.y, entityToMonitor.object3D.position.z);

    // Continuously monitor and log the position.
    this.el.sceneEl.addEventListener('tick', () => {
      const newPosition = entityToMonitor.object3D.position;

      // Log the current position in real-time.
      console.log('Current Position (x, y, z):', newPosition.x, newPosition.y, newPosition.z);

      // You can perform additional actions or logic here based on the current position.
    });
  }
});

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    movementFactor: { default: 1 },
    zoomFactor: { default: 1 },
    min: { type: 'vec3', default: {x: -0.25, y: 1.15, z: 0.1} }, // Minimum position
    max: { type: 'vec3', default: {x: 1.1875, y: 1.25, z: 0.2} }  // Maximum position
  },

  init: function () {
    this.handleZoom = this.handleZoom.bind(this);
    this.handleMovementHor = this.handleMovementHor.bind(this);
    this.handleMovementVert = this.handleMovementVert.bind(this);

    this.isVisible = false;
    this.initialPosition = this.el.object3D.position.clone();

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
    const newPosition = this.el.object3D.position.clone();
    newPosition.x -= event.detail.positionChange.x * this.data.movementFactor;

    // Check and enforce movement boundaries relative to the container.
    newPosition.x = Math.max(this.data.min.x, Math.min(this.data.max.x, newPosition.x));
    newPosition.y = Math.max(this.data.min.y, Math.min(this.data.max.y, newPosition.y));
    newPosition.z = Math.max(this.data.min.z, Math.min(this.data.max.z, newPosition.z));

    this.el.object3D.position.copy(newPosition);
  },

  handleMovementVert: function (event) {
    const newPosition = this.el.object3D.position.clone();
    newPosition.y += event.detail.positionChange.y * this.data.movementFactor;
    newPosition.z -= event.detail.positionChange.y * this.data.movementFactor;

    // Check and enforce movement boundaries relative to the container.
    newPosition.x = Math.max(this.data.min.x, Math.min(this.data.max.x, newPosition.x));
    newPosition.y = Math.max(this.data.min.y, Math.min(this.data.max.y, newPosition.y));
    newPosition.z = Math.max(this.data.min.z, Math.min(this.data.max.z, newPosition.z));

    this.el.object3D.position.copy(newPosition);
  },
    
  handleZoom: function (event) {
    const newPosition = this.el.object3D.position.clone();
    newPosition.y -= event.detail.spreadChange * this.data.zoomFactor;
    newPosition.z -= event.detail.spreadChange * this.data.zoomFactor;

    // Check and enforce movement boundaries relative to the container.
    newPosition.x = Math.max(this.data.min.x, Math.min(this.data.max.x, newPosition.x));
    newPosition.y = Math.max(this.data.min.y, Math.min(this.data.max.y, newPosition.y));
    newPosition.z = Math.max(this.data.min.z, Math.min(this.data.max.z, newPosition.z));

    this.el.object3D.position.copy(newPosition);
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
