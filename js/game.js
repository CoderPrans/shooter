// game
import {sounds} from './sound.js';
import {collision} from './collision.js';
import {createAlien, ri} from './alien.js';
import {createStar} from './star.js';

let gameState = {
  isOver: false,
  over: function(txt) {
    let dialog = document.querySelector('.dialog');
    let msg = document.querySelector('.msg');
    dialog.style.display = 'block';
    msg.innerHTML = txt;
  },
};

let {canvas} = kontra.init();

// canvasUnits
let isWide = window.innerWidth > 500;
let xunits = isWide ? 500 : window.innerWidth - 20;
let yunits = isWide ? window.innerHeight - 20 : window.innerHeight - 60;

canvas.width = xunits;
canvas.height = yunits;

// every sprite goes inside
let sprites = [];

// the game loop
let loop = kontra.GameLoop({
  update() {
    let isGameWon = sprites.filter(s => s.type === 'alien').length === 0;
    if (isGameWon && !gameState.isOver) {
      gameState.over('Game Over <br /> You Won !!');
      gameState.isOver = true;
    }
    // edge correction
    sprites.map(sprite => {
      sprite.update();
      if (sprite.x < -sprite.radius) {
        sprite.x = canvas.width + sprite.radius;
      } else if (sprite.x > canvas.width + sprite.radius) {
        sprite.x = 0 - sprite.radius;
      }
      if (sprite.y < -sprite.radius) {
        sprite.y = canvas.height + sprite.radius;
      } else if (sprite.y > canvas.height + sprite.radius) {
        sprite.y = -sprite.radius;
        if (sprite.type === 'alien') {
          gameState.over('Game Over <br / > You Lost :(');
          gameState.isOver = true;
        }
      }
    });

    collision(sprites, createAlien, pad, gameState);

    sprites = sprites.filter(sprite => sprite.isAlive());
  },
  render() {
    sprites.map(sprite => sprite.render());
  },
});

loop.start();

let pad = xunits / 6;
let r = pad / 4;

//Aliens
for (let i = 0; i < 15; i++) {
  let {rx, ry} = ri(i);
  let xpos = pad + rx * pad;
  let ypos = pad + (ry * pad) / 2;
  sprites.push(createAlien(xpos, ypos, r));
}

//Stars
for (let i = 0; i < 100; i++) {
  sprites.push(createStar(xunits, yunits));
}

//Ship
kontra.initKeys();

let ship = kontra.Sprite({
  type: 'ship',
  x: xunits / 2 - 15,
  y: yunits - 20,
  radius: 22,
  dt: 0,
  render() {
    this.context.strokeStyle = 'white';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + 15, this.y - 22);
    this.context.lineTo(this.x + 30, this.y);
    this.context.closePath();
    this.context.stroke();
  },
  update() {
    if (kontra.keyPressed('left')) {
      this.x -= 5;
    } else if (kontra.keyPressed('right')) {
      this.x += 5;
    }
    this.advance();
    this.dt += 1 / 60;
    if (kontra.keyPressed('down') && this.dt > 0.25) {
      sounds.shoot.play();
      this.dt = 0;
      sprites.push(
        kontra.Sprite({
          color: 'yellow',
          x: this.x + 14,
          y: this.y - 23,
          dy: -12,
          ttl: 45,
          radius: 2,
          width: 2,
          height: 5,
        }),
      );
    }
  },
});
sprites.push(ship);

function shootFromDom() {
  if (!gameState.isOver) {
    sounds.shoot.play();
    ship.dt = 0;
    sprites.push(
      kontra.Sprite({
        color: 'yellow',
        x: ship.x + 14,
        y: ship.y - 23,
        dy: -12,
        ttl: 45,
        radius: 2,
        width: 2,
        height: 5,
      }),
    );
  }
}

document.querySelector('#shoot').addEventListener('click', shootFromDom);
document.querySelector('#left').addEventListener('click', () => (ship.x -= 20));
document
  .querySelector('#right')
  .addEventListener('click', () => (ship.x += 20));
