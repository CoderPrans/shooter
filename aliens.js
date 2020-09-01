let pad = xunits / 6;
let r = pad / 4;

function createAlien(x, y, radius) {
  let alien = kontra.Sprite({
    type: 'alien',
    x,
    y,
    dy: 0.2,
    radius,
    render() {
      this.context.strokeStyle = 'green';
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.context.stroke();
    },
  });
  sprites.push(alien);
}

for (let i = 0; i < 15; i++) {
  let xpos = pad + ri(i).rx * pad;
  let ypos = pad + (ri(i).ry * pad) / 2;
  createAlien(xpos, ypos, r);
}

function ri(i) {
  if (i < 5) {
    return {rx: i, ry: 0};
  } else if (i >= 5 && i < 9) {
    return {rx: i - 4.5, ry: 1};
  } else if (i >= 9 && i < 12) {
    return {rx: i - 8, ry: 2};
  } else if (i >= 12 && i < 14) {
    return {rx: i - 10.5, ry: 3};
  } else {
    return {rx: i - 12, ry: 4};
  }
}
