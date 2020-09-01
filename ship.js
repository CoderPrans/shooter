// hero ship
kontra.initKeys();

let ship = kontra.Sprite({
  x: xunits / 2 - 15,
  y: yunits - 20,
  radius: 22,
  health: 1, // 0 to 1
  dt: 0,
  render() {
    this.context.strokeStyle = 'white';
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(15, -22);
    this.context.lineTo(30, 0);
    this.context.closePath();
    this.context.stroke();
    // this.context.moveTo(0, 5);
    // this.context.lineTo(30 * this.health, 5);
    // this.context.stroke();
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
      this.dt = 0;
      let bullet = kontra.Sprite({
        color: 'yellow',
        x: this.x + 14,
        y: this.y - 23,
        dy: -12,
        ttl: 45,
        radius: 2,
        width: 2,
        height: 5,
      });
      sprites.push(bullet);
    }
  },
});
sprites.push(ship);
