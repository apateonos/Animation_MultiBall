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
  var self = this;
  if (self.balls.length >= self.maximumBall) {
    return false;
  }
  settings.radius = self.property.radius;
  settings.mass = self.property.mass;
  settings.elasticity = self.property.elasticity;
  settings.velocity = {
    x: Math.random()*1,
    y: Math.random()*1
  }
  this.balls.push(settings);
}

Ball.prototype.getVelocity = function(self) {

}

Ball.prototype.collisionBall = function(self) {

}

Ball.prototype.bounceWindow = function(self) {
  if( self.radius >= self.x || self.x >= this.stageWidth){
    self.velocity.x *= -1;
  }
  if( self.radius >= self.y || self.y >= this.stageHeight){
    self.velocity.y *= -1;
  }  
}

Ball.prototype.set = function() {
  var self = this;
  for (var idx in self.balls){
    var ball = self.balls[idx];

    this.bounceWindow(ball);
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;

    this.context.beginPath();
    this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'black';
    this.context.fill();
    this.context.closePath();
  }
}