export default function Ball(settings) {
  console.log(settings);
  this.balls = [];
  this.stageWidth = settings.stageWidth;
  this.stageHeight = settings.stageHeight;
  this.context = settings.context;
  this.maximumBall = settings.maximum;
  this.property = {
    radius: 10,
    mass: 1,
    elasticity: 1
  }
}

console.log(Ball.prototype);

Ball.prototype.addBall = function(settings) {
  var count = 0;
  var self = this;
  if (self.balls.length >= self.maximumBall) {
    return false;
  }
  settings.radius = self.property.radius;
  settings.mass = self.property.mass;
  settings.elasticity = self.property.elasticity;
  settings.velocity = {
    x: Math.random()*4,
    y: Math.random()*4
  }
  this.balls.push(settings);
  console.log(this.balls)
}

Ball.prototype.getVelocity = function(self) {

}

Ball.prototype.collisionBall = function(self, idx) {
  for (var key in this.balls){
    if(key !== idx){
      var oppnent = this.balls[key];
      var distance = Math.sqrt(Math.pow(oppnent.x - self.x, 2) + Math.pow(oppnent.y - self.y, 2), 2);
      var collisionDistance = self.radius + oppnent.radius;
      if (distance <= collisionDistance){
        var tx = oppnent.velocity.x;
        var ty = oppnent.velocity.y;

        oppnent.velocity.x = self.velocity.x;
        oppnent.velocity.y = self.velocity.y;
        self.velocity.x = tx;
        self.velocity.y = ty;
      }
    }
  }
}

Ball.prototype.bounceWindow = function(self) {
  if( self.radius >= self.x || self.x >= this.stageWidth){
    self.velocity.x *= -1;
  }
  if( self.radius >= self.y || self.y >= this.stageHeight){
    self.velocity.y *= -1;
  }
}

Ball.prototype.move = function(self) {
  self.x += self.velocity.x;
  self.y += self.velocity.y;
}

Ball.prototype.set = function() {
  var self = this;
  for (var idx in self.balls){
    var ball = self.balls[idx];

    this.collisionBall(ball, idx);
    this.bounceWindow(ball);
    this.move(ball);

    this.context.beginPath();
    this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.closePath();
  }
}