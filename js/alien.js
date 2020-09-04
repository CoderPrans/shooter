// alien

export function createAlien(x, y, radius) {
  return kontra.Sprite({
    type: 'alien',
    x,
    y,
    dy: 0.2,
    radius,
    render() {
      this.context.fillStyle = 'purple';
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.context.fill();
    },
  });
}
// relative index: returns relative x, relative y
export function ri(i) {
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
