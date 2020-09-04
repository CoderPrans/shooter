// star sprites

export function createStar(xunits, yunits) {
  return kontra.Sprite({
    type: 'star',
    x: Math.random() * xunits,
    y: Math.random() * yunits,
    dx: Math.random() / 10,
    dy: Math.random() / 10,
    radius: 1,
    render() {
      this.context.strokeStyle = 'white';
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.context.stroke();
    },
  });
}
