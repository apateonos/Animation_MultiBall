import Ball from './ball.js';
import Block from './block.js';

class App {
  constructor(){
    console.log(this);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.isPress = false;
    this.mass = 1;
    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    var freeSet = {
      stageWidth: this.stageWidth,
      stageHeight: this.stageHeight,
      context: this.context,
      maximum: 10
    }
    this.block = new Block({...freeSet});
    this.ball = new Ball({
      ...freeSet
    });
    
    window.addEventListener('mousedown', this.isClick.bind(this), false);
    window.addEventListener('mouseup', this.isRelease.bind(this), false);    
    window.requestAnimationFrame(this.animate.bind(this));
  }

  isClick() {
    this.isPress = true;
  }


  isRelease(e) {
    this.isPress = false;
    var x = e.clientX;
    var y = e.clientY;
    var mass = this.mass;
    this.ball.addBall({x, y, mass});
    this.mass = 1;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
  }

  massUp() {
    if (this.mass <= 10) {
      this.mass += 0.1;
    }
  }

  animate() {
    this.context.clearRect(0,0, this.stageWidth, this.stageHeight);
    if(this.isPress){ this.massUp() };

    this.block.setBlock();
    this.ball.setBall(this.block.blocks);
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = function (){
  new App();
}