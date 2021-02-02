import Block from './block.js';

export default function Ball(settings) {
  console.log(this);
  this.balls = [];
  this.stageWidth = settings.stageWidth;
  this.stageHeight = settings.stageHeight;
  this.context = settings.context;
  this.maximumBall = settings.maximum;
  this.gravity = 1;
  this.bounce = 9;
  this.property = {
    radius: 10,
    elasticity: 0.6
  }
}

Ball.prototype.addBall = function(settings) {
  const self = this;
  if (self.balls.length <= self.maximumBall) {
    settings.bounce = 0;
    settings.radius = self.property.radius;
    settings.elasticity = self.property.elasticity;
    settings.friction = false;
    settings.velocity = {
      x: 8*Math.random(),
      y: 4*Math.random()
    }
    this.balls.push(settings);
  }
}

Ball.prototype.getVelocity = function(self, oppnent) {
  const result = {
    x: ((self.velocity.x * (self.mass - oppnent.mass) + 2 * oppnent.mass * oppnent.velocity.x) / (self.mass + oppnent.mass)),
    y: ((self.velocity.y * (self.mass - oppnent.mass) + 2 * oppnent.mass * oppnent.velocity.y) / (self.mass + oppnent.mass))
  }

  return result;
}

Ball.prototype.collisionBall = function(self, idx) {
  for (var key in this.balls){
    if(key !== idx){
      const oppnent = this.balls[key];

      const px = self.x + self.velocity.x;
      const py = self.y + self.velocity.y;

      const distance = Math.sqrt(Math.pow(oppnent.x - px, 2) + Math.pow(oppnent.y - py, 2), 2);
      const collisionDistance = self.radius*self.mass + oppnent.radius*oppnent.mass;
      if (distance <= collisionDistance){
        oppnent.friction = true;
        self.friction = true;

        const sv = this.getVelocity(self, oppnent);
        const ov = this.getVelocity(oppnent, self);

        self.velocity = sv;
        oppnent.velocity = ov;
      }
    }
  }
}

Ball.prototype.impactBlock = function (self, blocks) {
  const radius = self.radius * self.mass;
  const px = self.x + self.velocity.x;
  const py = self.y + self.velocity.y;

  for(var idx in blocks) {
    const block = blocks[idx];
    const nX = block.x - radius;
    const nY = block.y - radius;
    const mX = block.x + block.width + radius;
    const mY = block.y + block.thickness + radius;

    if ( px > nX && px < mX && py > nY && py < mY ) {
      const x1 = Math.abs(nX - px);
      const x2 = Math.abs(px - mX);
      const y1 = Math.abs(nY - py);
      const y2 = Math.abs(py - mY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      Block.prototype.isImpact(idx, blocks);
      if (min == min1) {
        self.velocity.x *= -1*self.elasticity;
        self.friction = true
      }
      if (min == min2) {
        self.velocity.y *= -1*self.elasticity;
        self.friction = true;
      }
    }
  }
}

Ball.prototype.gravityEffect = function (self) {
  self.velocity.y += this.gravity;
}

Ball.prototype.bounceWindow = function(self, idx) {
  const px = self.x + self.velocity.x;
  const py = self.y + self.velocity.y;

  if( self.radius >= px || px >= this.stageWidth ){
    self.velocity.x *= -1*self.elasticity;
    self.friction = true
  }
  // 천장 제거
  if( self.radius >= py || py >= this.stageHeight ){
    if(self.bounce >= this.bounce) {       
      this.balls.splice(idx, 1);
    }else {
      self.bounce += 1;
      self.velocity.y *= -1*self.elasticity;
      self.friction = true;
    }

  } else {
    this.gravityEffect(self);
  }
}

Ball.prototype.moveBall = function(self) {
  self.x += self.velocity.x;
  self.y += self.velocity.y;
}

Ball.prototype.setBall = function(blocks) {
  const self = this;
  for ( var idx in self.balls ){
    const ball = self.balls[idx];

    this.context.beginPath();
    this.bounceWindow(ball, idx);
    this.collisionBall(ball, idx);
    this.impactBlock(ball, blocks);
    this.moveBall(ball);
    this.context.arc(ball.x, ball.y, ball.radius*ball.mass, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.closePath(); 
  }
}