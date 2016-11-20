//Simon bot for the game
function Simon(){
}

Simon.prototype.maxLength=20; //max sequence before one can win
Simon.prototype.getBotSequence=function(){ return this.botSequence;};
Simon.prototype.clearBotSequence=function(){ this.botSequence="";};
Simon.prototype.clearPlayerSequence=function(){ this.playerSequence="";};

/**
  * prepare a sequence of a,b,c,d
  * incrementing by one character each time
  * without repetition of previous character
  */
Simon.prototype.prepareBotSequence=function(){
  var min=97; //code for a
  var max=101; //code for e, e is excluded in random
  //pick a number between 97 & 100 (all inclusive)
  var c=Math.floor(Math.random()*(max-min))+min;
  c=String.fromCharCode(c); //convert that to character
  if(typeof this.botSequence==="undefined")
    this.botSequence=""; //initialize bot sequence if undefined

  var bsLength=this.botSequence.length;
  //generate random until one is generated
  //which is not equal to the last character
  //in current sequence, this is to avoid repetitive chars
  while(bsLength>0 && c===this.botSequence[bsLength-1]){
    c=Math.floor(Math.random()*(max-min))+min;
    c=String.fromCharCode(c);
  }
  this.botSequence+=c; //add the char to sequence
};

//add player sequence and accumulate
Simon.prototype.preparePlayerSequence=function(c){
  if(typeof this.playerSequence==="undefined")
    this.playerSequence=""; //intiate if undefined

  this.playerSequence+=c;
};

Simon.prototype.getPlayerSequence=function(){return this.playerSequence;};

/**
  * evaluate current status of the game
  * each time player inputs, this function will be called
  * accumulated player input is validated against bot sequence
  * let the player go on as long as the input mathes bot sequence
  * end the game if player wins
  * end the game if player inputs incorrect sequence in strict mode
  */
Simon.prototype.evaluateGameStatus=function(strict){
  var result=false;

  if(!this.playerSequence) //player inputs is blank
    return "No Input";
  if(!this.botSequence) //game has not started
    return "Game Off";
  var psLength=this.playerSequence.length;
  var bsLength=this.botSequence.length;

  if(psLength==this.maxLength && this.playerSequence===this.botSequence){
    //player matches bot and reaches max length - wins
    result="You Win";
  }else if(psLength===bsLength && this.playerSequence===this.botSequence){
    //player matches bot sequence fully (and game has not reached max length)
    //move to next level
    result="Next Level";
  } else if(psLength<bsLength && this.playerSequence===this.botSequence.substring(0,psLength)){
    //player matches bot sequence partially
    //wait for further input to validate
    result="Correct Input";
  } else if(psLength<=bsLength && this.playerSequence!==this.botSequence.substring(0,psLength)){
    //player input is incorrect
    if(strict)
      //game over if strict mode is on
      result="Game Over";
    else
      //give the player another chance to retry
      result="Try Again";
  }
  return result;
};

//for jasmine test framework
module.exports=Simon;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJTaW1vbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1NpbW9uIGJvdCBmb3IgdGhlIGdhbWVcbmZ1bmN0aW9uIFNpbW9uKCl7XG59XG5cblNpbW9uLnByb3RvdHlwZS5tYXhMZW5ndGg9MjA7IC8vbWF4IHNlcXVlbmNlIGJlZm9yZSBvbmUgY2FuIHdpblxuU2ltb24ucHJvdG90eXBlLmdldEJvdFNlcXVlbmNlPWZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmJvdFNlcXVlbmNlO307XG5TaW1vbi5wcm90b3R5cGUuY2xlYXJCb3RTZXF1ZW5jZT1mdW5jdGlvbigpeyB0aGlzLmJvdFNlcXVlbmNlPVwiXCI7fTtcblNpbW9uLnByb3RvdHlwZS5jbGVhclBsYXllclNlcXVlbmNlPWZ1bmN0aW9uKCl7IHRoaXMucGxheWVyU2VxdWVuY2U9XCJcIjt9O1xuXG4vKipcbiAgKiBwcmVwYXJlIGEgc2VxdWVuY2Ugb2YgYSxiLGMsZFxuICAqIGluY3JlbWVudGluZyBieSBvbmUgY2hhcmFjdGVyIGVhY2ggdGltZVxuICAqIHdpdGhvdXQgcmVwZXRpdGlvbiBvZiBwcmV2aW91cyBjaGFyYWN0ZXJcbiAgKi9cblNpbW9uLnByb3RvdHlwZS5wcmVwYXJlQm90U2VxdWVuY2U9ZnVuY3Rpb24oKXtcbiAgdmFyIG1pbj05NzsgLy9jb2RlIGZvciBhXG4gIHZhciBtYXg9MTAxOyAvL2NvZGUgZm9yIGUsIGUgaXMgZXhjbHVkZWQgaW4gcmFuZG9tXG4gIC8vcGljayBhIG51bWJlciBiZXR3ZWVuIDk3ICYgMTAwIChhbGwgaW5jbHVzaXZlKVxuICB2YXIgYz1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKG1heC1taW4pKSttaW47XG4gIGM9U3RyaW5nLmZyb21DaGFyQ29kZShjKTsgLy9jb252ZXJ0IHRoYXQgdG8gY2hhcmFjdGVyXG4gIGlmKHR5cGVvZiB0aGlzLmJvdFNlcXVlbmNlPT09XCJ1bmRlZmluZWRcIilcbiAgICB0aGlzLmJvdFNlcXVlbmNlPVwiXCI7IC8vaW5pdGlhbGl6ZSBib3Qgc2VxdWVuY2UgaWYgdW5kZWZpbmVkXG5cbiAgdmFyIGJzTGVuZ3RoPXRoaXMuYm90U2VxdWVuY2UubGVuZ3RoO1xuICAvL2dlbmVyYXRlIHJhbmRvbSB1bnRpbCBvbmUgaXMgZ2VuZXJhdGVkXG4gIC8vd2hpY2ggaXMgbm90IGVxdWFsIHRvIHRoZSBsYXN0IGNoYXJhY3RlclxuICAvL2luIGN1cnJlbnQgc2VxdWVuY2UsIHRoaXMgaXMgdG8gYXZvaWQgcmVwZXRpdGl2ZSBjaGFyc1xuICB3aGlsZShic0xlbmd0aD4wICYmIGM9PT10aGlzLmJvdFNlcXVlbmNlW2JzTGVuZ3RoLTFdKXtcbiAgICBjPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbikpK21pbjtcbiAgICBjPVN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgdGhpcy5ib3RTZXF1ZW5jZSs9YzsgLy9hZGQgdGhlIGNoYXIgdG8gc2VxdWVuY2Vcbn07XG5cbi8vYWRkIHBsYXllciBzZXF1ZW5jZSBhbmQgYWNjdW11bGF0ZVxuU2ltb24ucHJvdG90eXBlLnByZXBhcmVQbGF5ZXJTZXF1ZW5jZT1mdW5jdGlvbihjKXtcbiAgaWYodHlwZW9mIHRoaXMucGxheWVyU2VxdWVuY2U9PT1cInVuZGVmaW5lZFwiKVxuICAgIHRoaXMucGxheWVyU2VxdWVuY2U9XCJcIjsgLy9pbnRpYXRlIGlmIHVuZGVmaW5lZFxuXG4gIHRoaXMucGxheWVyU2VxdWVuY2UrPWM7XG59O1xuXG5TaW1vbi5wcm90b3R5cGUuZ2V0UGxheWVyU2VxdWVuY2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wbGF5ZXJTZXF1ZW5jZTt9O1xuXG4vKipcbiAgKiBldmFsdWF0ZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgZ2FtZVxuICAqIGVhY2ggdGltZSBwbGF5ZXIgaW5wdXRzLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gICogYWNjdW11bGF0ZWQgcGxheWVyIGlucHV0IGlzIHZhbGlkYXRlZCBhZ2FpbnN0IGJvdCBzZXF1ZW5jZVxuICAqIGxldCB0aGUgcGxheWVyIGdvIG9uIGFzIGxvbmcgYXMgdGhlIGlucHV0IG1hdGhlcyBib3Qgc2VxdWVuY2VcbiAgKiBlbmQgdGhlIGdhbWUgaWYgcGxheWVyIHdpbnNcbiAgKiBlbmQgdGhlIGdhbWUgaWYgcGxheWVyIGlucHV0cyBpbmNvcnJlY3Qgc2VxdWVuY2UgaW4gc3RyaWN0IG1vZGVcbiAgKi9cblNpbW9uLnByb3RvdHlwZS5ldmFsdWF0ZUdhbWVTdGF0dXM9ZnVuY3Rpb24oc3RyaWN0KXtcbiAgdmFyIHJlc3VsdD1mYWxzZTtcblxuICBpZighdGhpcy5wbGF5ZXJTZXF1ZW5jZSkgLy9wbGF5ZXIgaW5wdXRzIGlzIGJsYW5rXG4gICAgcmV0dXJuIFwiTm8gSW5wdXRcIjtcbiAgaWYoIXRoaXMuYm90U2VxdWVuY2UpIC8vZ2FtZSBoYXMgbm90IHN0YXJ0ZWRcbiAgICByZXR1cm4gXCJHYW1lIE9mZlwiO1xuICB2YXIgcHNMZW5ndGg9dGhpcy5wbGF5ZXJTZXF1ZW5jZS5sZW5ndGg7XG4gIHZhciBic0xlbmd0aD10aGlzLmJvdFNlcXVlbmNlLmxlbmd0aDtcblxuICBpZihwc0xlbmd0aD09dGhpcy5tYXhMZW5ndGggJiYgdGhpcy5wbGF5ZXJTZXF1ZW5jZT09PXRoaXMuYm90U2VxdWVuY2Upe1xuICAgIC8vcGxheWVyIG1hdGNoZXMgYm90IGFuZCByZWFjaGVzIG1heCBsZW5ndGggLSB3aW5zXG4gICAgcmVzdWx0PVwiWW91IFdpblwiO1xuICB9ZWxzZSBpZihwc0xlbmd0aD09PWJzTGVuZ3RoICYmIHRoaXMucGxheWVyU2VxdWVuY2U9PT10aGlzLmJvdFNlcXVlbmNlKXtcbiAgICAvL3BsYXllciBtYXRjaGVzIGJvdCBzZXF1ZW5jZSBmdWxseSAoYW5kIGdhbWUgaGFzIG5vdCByZWFjaGVkIG1heCBsZW5ndGgpXG4gICAgLy9tb3ZlIHRvIG5leHQgbGV2ZWxcbiAgICByZXN1bHQ9XCJOZXh0IExldmVsXCI7XG4gIH0gZWxzZSBpZihwc0xlbmd0aDxic0xlbmd0aCAmJiB0aGlzLnBsYXllclNlcXVlbmNlPT09dGhpcy5ib3RTZXF1ZW5jZS5zdWJzdHJpbmcoMCxwc0xlbmd0aCkpe1xuICAgIC8vcGxheWVyIG1hdGNoZXMgYm90IHNlcXVlbmNlIHBhcnRpYWxseVxuICAgIC8vd2FpdCBmb3IgZnVydGhlciBpbnB1dCB0byB2YWxpZGF0ZVxuICAgIHJlc3VsdD1cIkNvcnJlY3QgSW5wdXRcIjtcbiAgfSBlbHNlIGlmKHBzTGVuZ3RoPD1ic0xlbmd0aCAmJiB0aGlzLnBsYXllclNlcXVlbmNlIT09dGhpcy5ib3RTZXF1ZW5jZS5zdWJzdHJpbmcoMCxwc0xlbmd0aCkpe1xuICAgIC8vcGxheWVyIGlucHV0IGlzIGluY29ycmVjdFxuICAgIGlmKHN0cmljdClcbiAgICAgIC8vZ2FtZSBvdmVyIGlmIHN0cmljdCBtb2RlIGlzIG9uXG4gICAgICByZXN1bHQ9XCJHYW1lIE92ZXJcIjtcbiAgICBlbHNlXG4gICAgICAvL2dpdmUgdGhlIHBsYXllciBhbm90aGVyIGNoYW5jZSB0byByZXRyeVxuICAgICAgcmVzdWx0PVwiVHJ5IEFnYWluXCI7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vZm9yIGphc21pbmUgdGVzdCBmcmFtZXdvcmtcbm1vZHVsZS5leHBvcnRzPVNpbW9uO1xuIl0sImZpbGUiOiJTaW1vbi5qcyJ9
