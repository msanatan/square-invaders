var Game = Game || {};

Game.LaserShot = function(options) {
  'use strict';
  this.width = options.width || 8;
  this.height = options.height || 8;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.speed = options.speed || 15;
  this.colour = options.colour || '#EEDD88';
  this.damage = options.damage || 5;
  this.direction = options.direction === 'up' ? -1 : 1;
  this.hit = false;
};

Game.LaserShot.prototype.getBBox = function() {
  'use strict';
  return {
    x: this.x - this.width,
    y: this.y - this.height,
    width: this.width * 2,
    height: this.height
  };
};

Game.LaserShot.prototype.update = function() {
  'use strict';
  this.y += this.speed * this.direction;
};


Game.LaserShot.prototype.render = function(context) {
  'use strict';
  context.beginPath();
  context.fillStyle = this.colour;
  //Draw solid rectangle for shot, a smaller upside-down player really lol
  context.moveTo(this.x, this.y);
  context.lineTo(this.x - this.width, this.y - this.height);
  context.lineTo(this.x + this.width, this.y - this.height);
  context.fill();
  context.closePath();
};
