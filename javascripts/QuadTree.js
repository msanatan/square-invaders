var Game = Game || {};

Game.QuadTree = function(bounds, capacity, level) {
  'use strict';
  this.bouds = bounds;
  this.capacity = capacity || 15;
  this.level = level || 0;
};
