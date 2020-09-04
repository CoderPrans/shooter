function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}

export let sounds = {
  shoot: new sound('assets/shoot.wav'),
  hit: new sound('assets/hit.wav'),
};
