var Game = Game || {};

Game.getRandomInt = function(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min)) + min;
};

// Logic for easiest enemy
Game.BasicEnemy = function(options) {
  'use strict';
  Game.Sprite.call(this, options);
  this.xSpeed = 2;
  this.ySpeed = Game.getRandomInt(1, 5);
  this.colour = options.colour || '#66FF33';
  this.health = 5;
  this.shotWait = 1000;
};
Game.BasicEnemy.prototype = Object.create(Game.Sprite.prototype);
Game.BasicEnemy.constructor = Game.Sprite;

Game.BasicEnemy.prototype.move = function(x, y, width, height) {
  'use strict';
  this.x += x;
  this.y += y;

  // Prevent character from moving out of bounds
  if (this.x <= this.width) {
    this.x = this.width;
  } else if (this.x + this.width >= width) {
    this.x = width - this.width;
  }

  if (this.y <= 0) {
    this.y = 0;
  } else if (this.y + this.height >= height) {
    this.y = height - this.height;
  }
};

Game.BasicEnemy.prototype.update = function() {
  'use strict';
  var self, now, delta;
  if (this.health === 0) {
    this.dead = true;
  }

  // Move around pretty aimlessly
  if (this.x <= this.width || this.x >= this.canvasWidth - this.width) {
    this.xSpeed = -this.xSpeed;
  }

  if (this.y <= 0 || this.y >= this.canvasHeight * 0.5) {
    this.ySpeed = -this.ySpeed;
  }

  this.move(this.xSpeed, this.ySpeed, this.canvasWidth, this.canvasHeight);

  now = Date.now();
  delta = now - this.lastShot;
  // Shoot every few seconds
  if (delta >= this.shotWait) {
    this.laserShots.push(new Game.LaserShot({
      width: 7,
      height: 7,
      x: this.x,
      y: this.y,
      speed: 6,
      colour: '#EE3366',
      damage: this.damage,
      direction: 'down'
    }));
    this.lastShot = now;
  }

  // Update laser shot positions
  self = this;
  this.laserShots = this.laserShots.filter(function(ls) {
    ls.update();
    return (ls.y < self.canvasHeight) && !ls.hit;
  });
};

Game.BasicEnemy.prototype.render = function(context) {
  'use strict';
  context.beginPath();
  context.lineWidth = "2";
  context.strokeStyle = this.colour;
  context.strokeRect(this.x, this.y, this.width, this.height);
  context.closePath();

  this.laserShots.forEach(function(ls) {
    ls.render(context);
  });
};

// Logic for a harder enemy, takes one more hit to die and moves faster
Game.SolidEnemy = function(options) {
  'use strict';
  Game.BasicEnemy.call(this, options);
  this.xSpeed = 4;
  this.ySpeed = Game.getRandomInt(3, 6);
  this.colour = options.colour || '#66FF33';
  this.health = 10;
  this.shotWait = 500;
};
Game.SolidEnemy.prototype = Object.create(Game.BasicEnemy.prototype);
Game.SolidEnemy.constructor = Game.BasicEnemy;

Game.SolidEnemy.prototype.update = function() {
  'use strict';
  var self, now, delta;
  if (this.health === 0) {
    this.dead = true;
  }

  // Move around pretty aimlessly
  if (this.x <= this.width || this.x >= this.canvasWidth - this.width) {
    this.xSpeed = -this.xSpeed;
  }

  if (this.y <= 0 || this.y >= this.canvasHeight * 0.5) {
    this.ySpeed = -this.ySpeed;
  }

  this.move(this.xSpeed, this.ySpeed, this.canvasWidth, this.canvasHeight);

  now = Date.now();
  delta = now - this.lastShot;
  // Shoot every few seconds
  if (delta >= this.shotWait) {
    this.laserShots.push(new Game.LaserShot({
      width: 8,
      height: 8,
      x: this.x,
      y: this.y,
      speed: 7,
      colour: '#EE3366',
      damage: this.damage,
      direction: 'down'
    }));
    this.lastShot = now;
  }

  // Update laser shot positions
  self = this;
  this.laserShots = this.laserShots.filter(function(ls) {
    ls.update();
    return (ls.y - (5 * ls.height) < self.canvasHeight) && !ls.hit;
  });
};

Game.SolidEnemy.prototype.render = function(context) {
  'use strict';
  var colour = this.colour;
  context.beginPath();
  if (this.hit) {
    colour = '#FFFFFF';
    this.hit = false;
  }
  context.fillStyle = colour;
  context.fillRect(this.x, this.y, this.width, this.height);
  context.closePath();

  this.laserShots.forEach(function(ls) {
    ls.render(context);
  });
};
