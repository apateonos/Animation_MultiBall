import Ball from './ball.js';

class App {
  constructor(){
    console.log(this);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    
    var freeSet = {
      stageWidth: this.stageWidth,
      stageHeight: this.stageHeight,
      context: this.context,
      maximum: 10
    }
    this.ball = new Ball({
      ...freeSet
    });

    window.addEventListener('mousedown', this.onClick.bind(this), false);    
    window.requestAnimationFrame(this.animate.bind(this));
  }

  onClick(e) {
    var x = e.clientX;
    var y = e.clientY;
    this.ball.addBall({x, y});
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
  }

  gravity() {

  }

  animate() {
    this.context.clearRect(0,0, this.stageWidth, this.stageHeight);
    this.ball.set();
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = function (){
  new App();
}