function Simon(){
}
Simon.prototype.maxLength=6;
Simon.prototype.getBotSequence=function(){ return this.botSequence;};
Simon.prototype.clearBotSequence=function(){ this.botSequence="";};
Simon.prototype.clearPlayerSequence=function(){ this.playerSequence="";};

Simon.prototype.prepareBotSequence=function(){
  var min=97; //code for a
  var max=101; //code for e, e is excluded in random
  var c=Math.floor(Math.random()*(max-min))+min;
  c=String.fromCharCode(c);
  if(typeof this.botSequence==="undefined")
    this.botSequence="";
  var bsLength=this.botSequence.length;
  while(bsLength>0 && c===this.botSequence[bsLength-1]){
    c=Math.floor(Math.random()*(max-min))+min;
    c=String.fromCharCode(c);
  }
  this.botSequence+=c;
};

Simon.prototype.preparePlayerSequence=function(c){
  if(typeof this.playerSequence==="undefined")
    this.playerSequence="";
    
  this.playerSequence+=c;
};

Simon.prototype.getPlayerSequence=function(){return this.playerSequence;};

Simon.prototype.evaluateGameStatus=function(strict){
  var result=false;
  if(!this.playerSequence)
    return "No Input";
  if(!this.botSequence)
    return "Game Off";
  var psLength=this.playerSequence.length;
  var bsLength=this.botSequence.length;
  if(psLength==this.maxLength && this.playerSequence===this.botSequence){
    result="You Win";
  }else if(psLength===bsLength && this.playerSequence===this.botSequence){
    result="Next Level";
  } else if(psLength<bsLength && this.playerSequence===this.botSequence.substring(0,psLength)){
    result="Correct Input";
  } else if(psLength<=bsLength && this.playerSequence!==this.botSequence.substring(0,psLength)){
    if(strict)
      result="Game Over";
    else
      result="Try Again";
  }
  return result;
};

//for jasmine
module.exports=Simon;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJTaW1vbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBTaW1vbigpe1xufVxuU2ltb24ucHJvdG90eXBlLm1heExlbmd0aD02O1xuU2ltb24ucHJvdG90eXBlLmdldEJvdFNlcXVlbmNlPWZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmJvdFNlcXVlbmNlO307XG5TaW1vbi5wcm90b3R5cGUuY2xlYXJCb3RTZXF1ZW5jZT1mdW5jdGlvbigpeyB0aGlzLmJvdFNlcXVlbmNlPVwiXCI7fTtcblNpbW9uLnByb3RvdHlwZS5jbGVhclBsYXllclNlcXVlbmNlPWZ1bmN0aW9uKCl7IHRoaXMucGxheWVyU2VxdWVuY2U9XCJcIjt9O1xuXG5TaW1vbi5wcm90b3R5cGUucHJlcGFyZUJvdFNlcXVlbmNlPWZ1bmN0aW9uKCl7XG4gIHZhciBtaW49OTc7IC8vY29kZSBmb3IgYVxuICB2YXIgbWF4PTEwMTsgLy9jb2RlIGZvciBlLCBlIGlzIGV4Y2x1ZGVkIGluIHJhbmRvbVxuICB2YXIgYz1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKG1heC1taW4pKSttaW47XG4gIGM9U3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgaWYodHlwZW9mIHRoaXMuYm90U2VxdWVuY2U9PT1cInVuZGVmaW5lZFwiKVxuICAgIHRoaXMuYm90U2VxdWVuY2U9XCJcIjtcbiAgdmFyIGJzTGVuZ3RoPXRoaXMuYm90U2VxdWVuY2UubGVuZ3RoO1xuICB3aGlsZShic0xlbmd0aD4wICYmIGM9PT10aGlzLmJvdFNlcXVlbmNlW2JzTGVuZ3RoLTFdKXtcbiAgICBjPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbikpK21pbjtcbiAgICBjPVN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgdGhpcy5ib3RTZXF1ZW5jZSs9Yztcbn07XG5cblNpbW9uLnByb3RvdHlwZS5wcmVwYXJlUGxheWVyU2VxdWVuY2U9ZnVuY3Rpb24oYyl7XG4gIGlmKHR5cGVvZiB0aGlzLnBsYXllclNlcXVlbmNlPT09XCJ1bmRlZmluZWRcIilcbiAgICB0aGlzLnBsYXllclNlcXVlbmNlPVwiXCI7XG4gICAgXG4gIHRoaXMucGxheWVyU2VxdWVuY2UrPWM7XG59O1xuXG5TaW1vbi5wcm90b3R5cGUuZ2V0UGxheWVyU2VxdWVuY2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wbGF5ZXJTZXF1ZW5jZTt9O1xuXG5TaW1vbi5wcm90b3R5cGUuZXZhbHVhdGVHYW1lU3RhdHVzPWZ1bmN0aW9uKHN0cmljdCl7XG4gIHZhciByZXN1bHQ9ZmFsc2U7XG4gIGlmKCF0aGlzLnBsYXllclNlcXVlbmNlKVxuICAgIHJldHVybiBcIk5vIElucHV0XCI7XG4gIGlmKCF0aGlzLmJvdFNlcXVlbmNlKVxuICAgIHJldHVybiBcIkdhbWUgT2ZmXCI7XG4gIHZhciBwc0xlbmd0aD10aGlzLnBsYXllclNlcXVlbmNlLmxlbmd0aDtcbiAgdmFyIGJzTGVuZ3RoPXRoaXMuYm90U2VxdWVuY2UubGVuZ3RoO1xuICBpZihwc0xlbmd0aD09dGhpcy5tYXhMZW5ndGggJiYgdGhpcy5wbGF5ZXJTZXF1ZW5jZT09PXRoaXMuYm90U2VxdWVuY2Upe1xuICAgIHJlc3VsdD1cIllvdSBXaW5cIjtcbiAgfWVsc2UgaWYocHNMZW5ndGg9PT1ic0xlbmd0aCAmJiB0aGlzLnBsYXllclNlcXVlbmNlPT09dGhpcy5ib3RTZXF1ZW5jZSl7XG4gICAgcmVzdWx0PVwiTmV4dCBMZXZlbFwiO1xuICB9IGVsc2UgaWYocHNMZW5ndGg8YnNMZW5ndGggJiYgdGhpcy5wbGF5ZXJTZXF1ZW5jZT09PXRoaXMuYm90U2VxdWVuY2Uuc3Vic3RyaW5nKDAscHNMZW5ndGgpKXtcbiAgICByZXN1bHQ9XCJDb3JyZWN0IElucHV0XCI7XG4gIH0gZWxzZSBpZihwc0xlbmd0aDw9YnNMZW5ndGggJiYgdGhpcy5wbGF5ZXJTZXF1ZW5jZSE9PXRoaXMuYm90U2VxdWVuY2Uuc3Vic3RyaW5nKDAscHNMZW5ndGgpKXtcbiAgICBpZihzdHJpY3QpXG4gICAgICByZXN1bHQ9XCJHYW1lIE92ZXJcIjtcbiAgICBlbHNlXG4gICAgICByZXN1bHQ9XCJUcnkgQWdhaW5cIjtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy9mb3IgamFzbWluZVxubW9kdWxlLmV4cG9ydHM9U2ltb247XG4iXSwiZmlsZSI6IlNpbW9uLmpzIn0=
