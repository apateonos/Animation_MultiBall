export default function Block (settings) {
  console.log(this);
  this.blocks = [];
  this.context = settings.context;
  this.stageWidth = settings.stageWidth;
  this.stageHeight = settings.stageHeight;
  this.settings = {
    maximumBlock: 6,
    factorRate: 0.01,
    durability: 5,
    maxWidth: 300,
    thickness: 25
  }
}

Block.prototype.addBlock = function(settings) {
  var self = this;
  if (self.blocks.length < self.settings.maximumBlock) {
    settings.opacity = 1;
    settings.color = `rgb(255, 192, 232, 1)`;
    settings.durability = self.settings.durability;
    settings.width = self.settings.maxWidth*Math.random();
    settings.thickness = self.settings.thickness;
    settings.x = this.stageWidth * Math.random();
    settings.y = this.stageHeight * Math.random();
    
    self.blocks.push(settings);
  }
}
// 수정이 필요함
Block.prototype.isImpact = function(idx, blocks) {
  const self = blocks[idx];
  console.log('impact!!')
  if ( self.durability <= 0 ){
    blocks.splice(idx, 1);
  } else{
    self.opacity -= 0.2;
    console.log(self.opacity);
    self.color = `rgb(255, 192, 232, ${self.opacity})`;
    self.durability -= 1;
  }
}

Block.prototype.setBlock = function() {
  if (this.settings.factorRate >= Math.random()){
    this.addBlock({});
  }

  for(var idx in this.blocks) {
    var self = this.blocks[idx];
    this.context.beginPath();
    this.context.rect(self.x, self.y, self.width, self.thickness);
    this.context.fillStyle = self.color;
    this.context.fillText = self.opacity; 
    this.context.fill();
    this.context.closePath();
  }
}