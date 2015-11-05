var Game = Game || {};

Game.InputHandler = function() {
  this.keysDown = {};
  this.lastKey = null;
  this.mouse = {};
  this.mouse = {
    x: 0,
    y: 0,
    clicked: false,
    down: false
  };
  this.pressed = false;
};

/* Useful key abstractions courtesy:
http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
*/
Game.InputHandler.prototype.KEY = {
  'BACK_SPACE': 8,
  'TAB': 9,
  'RTN': 13,
  'SHIFT': 16,
  'CTRL': 17,
  'ALT': 18,
  'BREAK': 19,
  'CAPS': 20,
  'ESC': 27,
  'SPACE': 32,
  'PAGE_UP': 33,
  'PAGE_DOWN': 34,
  'END': 35,
  'HOME': 36,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40,
  'INSERT': 45,
  'DELETE': 46,
  'NUM_PAD_MULT': 106,
  'NUM_PAD_PLUS': 107,
  'NUM_PAD_MINUS': 109,
  'NUM_PAD_PERIOD': 110,
  'NUM_PAD_DIV': 111,
  'NUM_LOCK': 144,
  'SCROLL_LOCK': 145,
  'SEMI_COLON': 186,
  'EQUAL_SIGN': 187,
  'COMMA': 188,
  'DASH': 189,
  'PERIOD': 190,
  'FORWARD_SLASH': 191,
  'GRAVE_ACCENT': 192,
  'OPEN_BRACKET': 219,
  'BACK_SLASH': 220,
  'CLOSE_BRACKET': 221,
  'SINGLE_QUOTE': 222
};

(function addNumPairs() {
  var i;
  for (i = 0; i < 10; i++) {
    Game.InputHandler.prototype.KEY['' + i] = 48 + i;
  }
})();

(function addLetterPairs() {
  var i;
  for (i = 65; i < 91; i++) {
    Game.InputHandler.prototype.KEY['' + String.fromCharCode(i)] = i;
  }
})();

(function addNumPadPairs() {
  var i;
  for (i = 96; i < 106; i++) {
    Game.InputHandler.prototype.KEY['NUM_PAD_' + (i - 96)] = i;
  }
})();

(function addFKeyPairs() {
  var i;
  for (i = 112; i < 124; i++) {
    Game.InputHandler.prototype.KEY['F' + (i - 111)] = i;
  }
})();

Game.InputHandler.prototype.register = function(canvas) {
  var self;
  self = this;
  canvas.addEventListener('keydown', function(e) {
    if (e.keyCode !== self.KEY.F5 || e.keyCode !== self.KEY.F11) {
      e.preventDefault();
      e.stopPropagation();
    }
    self.keysDown[e.keyCode] = true;
  });

  canvas.addEventListener('keyup', function(e) {
    if (e.keyCode !== self.KEY.F5 || e.keyCode !== self.KEY.F11) {
      e.preventDefault();
      e.stopPropagation();
    }
    delete self.keysDown[e.keyCode];
  });

  canvas.addEventListener('mouseover', function(e) {
    self.mouse.x = e.offsetX;
    self.mouse.y = e.offsetY;
  });

  canvas.addEventListener('mousedown', function(e) {
    self.mouse.down = true;
  });

  canvas.addEventListener('click', function(e) {
    self.mouse.clicked = true;
  });

  canvas.addEventListener('mouseup', function(e) {
    self.mouse.down = false;
  });
};

Game.InputHandler.prototype.update = function() {
  var keys, keyDown;
  keys = Object.keys(this.keysDown);
  keyDown = keys.length > 0 ? this.keysDown[keys[0]] : null;
  this.pressed =  keyDown !== this.lastKey;
  this.lastKey = this.keysDown[keys[0]];
};

Game.InputHandler.prototype.reset = function() {
  this.keysDown = {};
  this.lastKey = null;
  this.mouse = {};
  this.mouse = {
    x: 0,
    y: 0,
    clicked: false,
    down: false
  };
  this.pressed = false;
};
