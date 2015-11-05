var Game = Game || {};

Game.Sprite = function(options) {
  'use strict';
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.canvasWidth = options.canvasWidth || 1280;
  this.canvasHeight = options.canvasHeight || 640;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.xSpeed = options.xSpeed || 5;
  this.ySpeed = options.ySpeed || 5;
  this.colour = options.colour || '#123456';
  this.health = 0;
  this.laserShots = [];
  this.hit = false;
  this.shotWait = 0;
  this.score = 0;
  this.damage = 5;
  this.dead = false;
};

Game.Sprite.prototype.getBBox = function() {
  'use strict';
  return {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  };
};

Game.Sprite.prototype.getHit = function(damage) {
  this.health -= damage;
  this.hit = true;
};

Game.Sprite.prototype.update = function() {
  'use strict';
  // To be overwritten
};

Game.Sprite.prototype.render = function(context) {
  'use strict';
  // To be overwritten
};
