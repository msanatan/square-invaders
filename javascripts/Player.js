var Game = Game || {};

Game.Player = function(options) {
  'use strict';
  Game.Sprite.call(this, options);
  this.colour = options.colour || '#AADDCC';
  this.xSpeed = options.xSpeed || 10;
  this.ySpeed = options.ySpeed || 10;
  this.health = 100;
};
Game.Player.prototype = Object.create(Game.Sprite.prototype);
Game.Player.constructor = Game.Sprite;

Game.Player.prototype.getBBox = function() {
  'use strict';
  return {
    x: this.x - this.width,
    y: this.y - this.height,
    width: this.width * 2,
    height: this.height
  };
};

Game.Player.prototype.move = function(x, y, width, height) {
  'use strict';
  this.x += x;
  this.y += y;

  // Prevent character from moving out of bounds
  if (this.x <= this.width) {
    this.x = this.width;
  } else if (this.x + this.width >= width) {
    this.x = width - this.width;
  }

  if (this.y <= height * 0.75) {
    this.y = (height * 0.75);
  } else if (this.y + this.height >= height) {
    this.y = height - this.height;
  }
};

Game.Player.prototype.update = function(inputHandler) {
  'use strict';
  var laserOptions;
  if (this.health === 0) {
    this.dead = true;
  }

  if(inputHandler.isDown('UP') || inputHandler.isDown('W')) {
    this.move(0, -this.ySpeed, this.canvasWidth, this.canvasHeight);
  } else if (inputHandler.isDown('DOWN') || inputHandler.isDown('S')) {
    this.move(0, this.ySpeed, this.canvasWidth, this.canvasHeight);
  } else if (inputHandler.isDown('LEFT') || inputHandler.isDown('A')) {
    this.move(-this.xSpeed, 0, this.canvasWidth, this.canvasHeight);
  } else if (inputHandler.isDown('RIGHT') || inputHandler.isDown('D')) {
    this.move(this.xSpeed, 0, this.canvasWidth, this.canvasHeight);
  }

  if (inputHandler.keysDown[inputHandler.KEY.SPACE] && this.shotWait === 0) {
    laserOptions = {
      width: 7,
      height: 7,
      x: this.x,
      y: this.y,
      speed: 15,
      colour: '#EEDD88',
      damage: this.damage,
      direction: 'up'
    };
    this.laserShots.push(new Game.LaserShot(laserOptions));
  }

  // Wait 5 frames between every laser shot
  if (this.shotWait === 0) {
    this.shotWait = 10;
  } else {
    this.shotWait -= 1;
  }

  // If the user is not holding the spacebar then automatically reset the
  // shot delay, so that spacebar presses won't be skipped
  if (!inputHandler.keysDown[inputHandler.KEY.SPACE]) {
    this.shotWait = 0;
  }

  // Update laser shot positions
  this.laserShots = this.laserShots.filter(function(ls) {
    ls.update();
    return (ls.y + ls.height > 0) && !ls.hit;
  });
};

Game.Player.prototype.render = function(context) {
  'use strict';
  context.beginPath();
  if (this.hit) {
    context.fillStyle = '#FFFFFF';
  } else {
    context.strokeStyle = this.colour;
  }
  //Draw triangle for player
  context.moveTo(this.x, this.y);
  context.lineTo(this.x - this.width, this.y + this.height);
  context.lineTo(this.x + this.width, this.y + this.height);
  context.lineTo(this.x, this.y);
  if (this.hit) {
    context.fill();
  } else {
    context.stroke();
  }
  context.closePath();

  this.laserShots.forEach(function(ls) {
    ls.render(context);
  });
};
