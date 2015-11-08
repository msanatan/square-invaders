var Game = Game || {};

Game.SquareInvaders = function(options) {
  'use strict';
  var playerOptions;
  this.width = options.width || 1280;
  this.height = options.height || 640;
  this.pause = false;
  playerOptions = {
    width: 20,
    height: 20,
    canvasWidth: this.width,
    canvasHeight: this.height,
    xSpeed: 10,
    ySpeed: 10,
    x: this.width / 2,
    y: this.height - 20
  };
  this.player = new Game.Player(playerOptions);
  this.enemies = [];
  this.spawnWait = 1000;
  this.lastSpawn = 0;
};

Game.SquareInvaders.prototype.update = function(inputHandler) {
  'use strict';
  var enemyOptions, now, delta;
  enemyOptions = {
    x: Math.random() * this.width,
    y: 0,
    canvasWidth: this.width,
    canvasHeight: this.height
  };

  this.player.hit = false;
  if (inputHandler.pressed && inputHandler.isDown('ESC') && !this.player.dead) {
    this.pause = !this.pause;
  }

  if (!this.pause && !this.player.dead) {
    Game.collisionCheck(this.player, this.enemies);
    this.player.update(inputHandler);
    this.enemies = this.enemies.filter(function(enemy) {
      enemy.update();
      return !enemy.dead;
    });

    now = Date.now();
    delta = now - this.lastSpawn;
    if (this.enemies.length <= 12 && delta >= this.spawnWait) {
      if (this.player.score < 100) {
        this.enemies.push(new Game.BasicEnemy(enemyOptions));
      } else if (this.player.score >= 100 && this.player.score <= 250) {
        this.enemies.push(new Game.SolidEnemy(enemyOptions));
      } else if (this.player.score > 250) {
        this.enemies.push(new Game.BasicEnemy(enemyOptions));
        this.enemies.push(new Game.SolidEnemy(enemyOptions));
      }
      this.lastSpawn = now;
    }
  }
};

Game.SquareInvaders.prototype.render = function(context) {
  'use strict';
  var textMeasure;
  context.beginPath();
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);
  context.closePath();

  // Player health
  context.beginPath();
  if (this.player.health >= 66.66) {
    context.fillStyle = '#54EF45';
  } else if (this.player.health < 66.66 && this.player.health >= 33.33) {
    context.fillStyle = '#FFD833';
  }
  else {
    context.fillStyle = '#FF4533';
  }
  context.arc(this.width / 20, 45, 40, 0, 2 * Math.PI, false);
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = '#FFFFFF';
  context.stroke();
  context.closePath();

  context.beginPath();
  context.font = '30pt "Courier New", Courier, monospace';
  context.textAlign = 'center';
  context.fillStyle = '#FFFFFF';
  context.fillText(this.player.health, this.width / 20, 60);
  context.closePath();

  // Score
  context.textAlign = 'start';
  context.beginPath();
  context.font = '25pt "Courier New", Courier, monospace';
  context.fillStyle = '#FFFFFF';
  context.fillText('Score: ' + this.player.score, this.width * 0.75, 40);
  context.closePath();

  if (this.pause) {
    context.beginPath();
    context.font = 'bold 120px Helvetica, Verdana, san-serif';
    context.fillStyle = '#FFDD88';
    textMeasure = context.measureText('Paused').width;
    context.fillText('Paused', (this.width / 2) - (textMeasure / 2), this.height / 2);
    context.closePath();
  }

  if (this.player.dead) {
    context.beginPath();
    context.font = 'bold 120px Helvetica, Verdana, san-serif';
    context.fillStyle = '#FF4343';
    textMeasure = context.measureText('Game Over').width;
    context.fillText('Game Over', (this.width / 2) - (textMeasure / 2), this.height / 2);
    context.closePath();
  }

  this.player.render(context);
  this.enemies.forEach(function(enemy) {
    enemy.render(context);
  });
};
