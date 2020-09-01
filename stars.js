function createStar() {
  let star = kontra.Sprite({
    type: 'star',
    x: Math.random() * xunits,
    y: Math.random() * yunits,
    dx: Math.random() / 10,
    dy: Math.random() / 10,
    radius: 1,
    render() {
      this.context.strokeStyle = 'white';
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
      // this.context.fillRect(10, 10, 1, 1);
      this.context.stroke();
    },
  });
  sprites.push(star);
}

for (let i = 0; i < 100; i++) {
  createStar();
}
