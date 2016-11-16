function Simon(){
}

Simon.prototype.prepareBotSequence=function(){
  var min=97; //code for a
  var max=101; //code for e, e is excluded in random
  var c=Math.floor(Math.random()*(max-min))+min;
  c=String.fromCharCode(c);
  if(typeof this.botSequence==="undefined")
    this.botSequence="";
  while(this.botSequence.length>0 && c===this.botSequence[this.botSequence.length-1]){
    c=Math.floor(Math.random()*(max-min))+min;
    c=String.fromCharCode(c);
  }
  this.botSequence+=c;
};

module.exports=Simon;
