import Ball from './ball.js';

class App {
  constructor(){
    console.log(this);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball;
  
    window.requestAnimationFrame(this.animate.bind(this));
  
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.context.clearRect(0,0, this.stageWidth, this.stageHeight);
  }
}

window.onload = function (){
  new App();
}