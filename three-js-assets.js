// built this helper function to allow my own collision detection
function createCube(height, width, depth) {
  var cubeGeometry = new THREE.BoxGeometry(height, width, depth);
  var cubeMaterial = new THREE.MeshLambertMaterial({color: 'blue'});
  THREE.Mesh.call(this, cubeGeometry, cubeMaterial);

  // Store as properties to be accessed in various functions
  this.height = height;
  this.width = width;
  this.depth = depth;
  //this.vector = createCube.prototype.calculateVector.call(this);
  this.squareRadius = Math.sqrt(this.height * this.height + this.width * this.width) / 2;
}

createCube.prototype = Object.create(THREE.Mesh.prototype);
createCube.prototype.constructor = createCube;

createCube.prototype.calculateVector = function() {
  return Math.sqrt(this.position.x * this.position.x + this.position.y * this.position.y);
}
createCube.prototype.calculateYOffset = function(obj) {
  var ySeparation = Math.abs(this.position.y - obj.position.y);
  ySeparation = ySeparation > 0 ? ySeparation / this.position.y : 0;
  ySeparation = ySeparation > 1 ? 1 : ySeparation;
  ySeparation = 1 - ySeparation;

  var distToSide = Math.sqrt((this.squareRadius * this.squareRadius) / 2);
  var radiusDiff = this.squareRadius - distToSide;

  return radiusDiff * ySeparation;
}
createCube.prototype.isColliding = function() {

  for (var i = 0; i < objectsInPlay.length; ++i) {
    if (objectsInPlay[i] !== this) {
      var cube1Vec = this.calculateVector();
      var cube2Vec = objectsInPlay[i].calculateVector();
      var cube1Sur = this.squareRadius;
      var cube2Sur = objectsInPlay[i].squareRadius;
      var yOffset = this.calculateYOffset(objectsInPlay[i]);

      if (Math.abs(cube1Vec - cube2Vec) <= (cube1Sur - yOffset) + (cube2Sur - yOffset)) {
        return true;
      }
    }
  }
}
createCube.prototype.move = function(axis, pixels) {
  //this.vector = this.calculateVector();
  this.position[axis] += pixels;

  if (this.isColliding()) {
    this.position[axis] -= pixels;
  }
}
