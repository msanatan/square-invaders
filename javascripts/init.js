var animate;
var Game = Game || {};
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var FPS = 30;
var engine = new Game.Engine('game', WIDTH, HEIGHT, FPS);

engine.init();
engine.register(new Game.SquareInvaders({
  width: WIDTH,
  height: HEIGHT,
  FPS: FPS
}));

// Use fallbacks for requestAnimationFrame
animate = (window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / FPS);
  });

// Taken from
(function() {
  function main() {
    Game.stopLoop = animate(main);
    engine.step();
  }
  main();
})();
