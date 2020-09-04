import {sounds} from './sound.js';

export function collision(sprites, createAlien, pad, gameState) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].type === 'alien') {
      for (let j = 0; j < sprites.length; j++) {
        if (sprites[j].type !== 'alien' && sprites[j].type !== 'star') {
          let alien = sprites[i];
          let sprite = sprites[j];

          let dx = alien.x - sprite.x;
          let dy = alien.y - sprite.y;

          if (Math.hypot(dx, dy) < alien.radius + sprite.radius) {
            sounds.hit.play();
            alien.ttl = 0;
            sprite.ttl = 0;

            if (alien.radius > pad / 8) {
              sprites.push(createAlien(alien.x, alien.y, alien.radius / 2));
            }

            if (sprite.type === 'ship') {
              gameState.over('Game Over <br /> You Lost :(');
              gameState.isOver = true;
            }
            break;
          }
        }
      }
    }
  }
}
