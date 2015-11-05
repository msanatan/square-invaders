var Game = Game || {};

Game.bboxCollision = function(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
    return true;
  }
  return false;
};

Game.collisionCheck = function(player, enemies) {
  'use strict';
  // Naïvely do collision detection
  player.laserShots.forEach(function(ls) {
    enemies.forEach(function(enemy) {
      if (Game.bboxCollision(ls.getBBox(), enemy.getBBox())) {
        enemy.getHit(ls.damage);
        ls.hit = true;
        player.score += ls.damage;
      }
    });
  });

  enemies.forEach(function(enemy) {
    enemy.laserShots.forEach(function(ls) {
      if (Game.bboxCollision(ls.getBBox(), player.getBBox())) {
        player.getHit(ls.damage);
        ls.hit = true;
      }
    });
  });

};
