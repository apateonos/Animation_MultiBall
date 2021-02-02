export default function Ball(settings) {
  console.log(settings);
  this.balls = [];
  this.stageWidth = settings.stageWidth;
  this.stageHeight = settings.stageHeight;
  this.context = settings.context;
  this.maximumBall = settings.maximum;
  this.gravity = 1;
  this.property = {
    radius: 10,
    elasticity: 0.8
  }
}

console.log(Ball.prototype);

Ball.prototype.addBall = function(settings) {
  var self = this;
  if (self.balls.length <= self.maximumBall) {
    settings.bounce = 0;
    settings.radius = self.property.radius;
    settings.elasticity = self.property.elasticity;
    settings.friction = false;
    settings.velocity = {
      x: 8*Math.random(),
      y: 0
    }
    this.balls.push(settings);
  }
}

Ball.prototype.getVelocity = function(self, oppnent) {
  var result = {
    x: ((self.velocity.x * (self.mass - oppnent.mass) + 2 * oppnent.mass * oppnent.velocity.x) / (self.mass + oppnent.mass)),
    y: ((self.velocity.y * (self.mass - oppnent.mass) + 2 * oppnent.mass * oppnent.velocity.y) / (self.mass + oppnent.mass))
  }

  return result;
}

Ball.prototype.collisionBall = function(self, idx) {
  for (var key in this.balls){
    if(key !== idx){
      var oppnent = this.balls[key];

      var px = self.x + self.velocity.x;
      var py = self.y + self.velocity.y;

      var distance = Math.sqrt(Math.pow(oppnent.x - px, 2) + Math.pow(oppnent.y - py, 2), 2);
      var collisionDistance = self.radius*self.mass + oppnent.radius*oppnent.mass;
      if (distance <= collisionDistance){
        oppnent.friction = true;
        self.friction = true;

        console.log('collision');
        var sv = this.getVelocity(self, oppnent);
        var ov = this.getVelocity(oppnent, self);

        self.velocity = sv;
        oppnent.velocity = ov;
      }
    }
  }
}

Ball.prototype.gravityEffect = function (self) {
  self.velocity.y += this.gravity;
}


Ball.prototype.bounceWindow = function(self, idx) {
  var px = self.x + self.velocity.x;
  var py = self.y + self.velocity.y;

  if( self.radius >= px || px >= this.stageWidth){
    self.velocity.x *= -1*self.elasticity;
    self.friction = true
  }
  // 천장 제거
  if( /* self.radius >= py || */ py >= this.stageHeight){
    self.velocity.y *= -1*self.elasticity;
    self.bounce += 1;
    self.friction = true;
  } else {
    this.gravityEffect(self);
  }
}

Ball.prototype.moveBall = function(self) {
  self.x += self.velocity.x;
  self.y += self.velocity.y;
}

Ball.prototype.setBall = function() {
  var self = this;
  for (var idx in self.balls){
    var ball = self.balls[idx];
    this.context.beginPath();
    this.collisionBall(ball, idx);
    this.bounceWindow(ball, idx);
    this.moveBall(ball);
    this.context.arc(ball.x, ball.y, ball.radius*ball.mass, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.closePath();    
  }
}