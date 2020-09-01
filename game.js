let gameState = {
  over: function() {
    let dialog = document.querySelector('.dialog');
    let msg = document.querySelector('.msg');
    dialog.style.display = 'block';
    msg.innerHTML = 'Game Over !';
  },
};

let {canvas} = kontra.init();

let xunits = window.innerWidth > 500 ? 500 : window.innerWidth - 20;
let yunits = window.innerHeight - 20;

canvas.width = xunits;
canvas.height = yunits;

let sprites = [];

let loop = kontra.GameLoop({
  update() {
    sprites.map(sprite => {
      sprite.update();
      // sprite is beyond left edge
      if (sprite.x < -sprite.radius) {
        sprite.x = canvas.width + sprite.radius;
      }
      // sprite is beyond right edge
      else if (sprite.x > canvas.width + sprite.radius) {
        sprite.x = 0 - sprite.radius;
      }
      // sprite is beyond top edge
      if (sprite.y < -sprite.radius) {
        sprite.y = canvas.height + sprite.radius;
      }
      // sprite is beyond bottom edge
      else if (sprite.y > canvas.height + sprite.radius) {
        sprite.y = -sprite.radius;
        if (sprite.type === 'alien') {
          gameState.over();
        }
      }
    });

    // collision detection
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i].type === 'alien') {
        for (let j = 0; j < sprites.length; j++) {
          if (sprites[j].type !== 'alien' && sprites[j].type !== 'star') {
            let alien = sprites[i];
            let sprite = sprites[j];

            let dx = alien.x - sprite.x;
            let dy = alien.y - sprite.y;

            if (Math.hypot(dx, dy) < alien.radius + sprite.radius) {
              alien.ttl = 0;
              sprite.ttl = 0;

              if (alien.radius > pad / 8) {
                createAlien(alien.x, alien.y, alien.radius / 2);
              }

              if (sprite.type === 'ship') {
                gameState.over();
              }
              break;
            }
          }
        }
      }
    }

    sprites = sprites.filter(sprite => sprite.isAlive());
  },
  render() {
    sprites.map(sprite => sprite.render());
  },
});

loop.start();
