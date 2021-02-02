export default function Block () {
  this.blocks = [];
  this.settings = {
    maximumBlock: 6,
    factorRate: 0.01,
    durability: 5,
    maxWidth: 300,
    thickness: 25
  }
}

console.log('Block property', Block);

Block.prototype.addBlock = function(settings) {
  var self = this;
  if (self.blocks.length <= self.maximumBlock) {
    settings.durability = self.durability;
    settings.width = self.maxWidth*Math.random();
    settings.thickness = self.thickness;
    settings.x = this.stageWidth * Math.random();
    settings.y = this.stageHeight * Math.random();
    
    self.blocks.push(settings);
  }
}

Block.prototype.isImpact = function() {

}

Block.prototype.setBlock = function() {
  if (this.settings.factorRate >= Math.random()){
    this.addBlock();
  }
}