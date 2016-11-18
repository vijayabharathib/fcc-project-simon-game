module.imports '../../app/scripts/Simon.js';
describe("Simon", function(){
  var Simon = require('../../app/scripts/Simon');
  var simon;

  beforeEach(function(){
    simon=new Simon();
  });

  it("should be able to create a sequence", function(){
    simon.prepareBotSequence();
    expect(simon.getBotSequence().length).toEqual(1);

  });

  it("should contain only a,b,c or d",function(){
    simon.prepareBotSequence();
    expect(simon.getBotSequence()).toMatch(/^[abcd]+$/);
  });

  it("should not contain repetitive pattern aa,bb,cc or dd", function(){
    for(var i=0;i<25;i++)
      simon.prepareBotSequence();
    expect(simon.getBotSequence().length).toEqual(25);
    expect("abc").not.toMatch(/([abcd])\1/); //these are testing the regexp actually
    expect("abcdabcd").not.toMatch(/([abcd])\1/);//these are testing the regexp actually
    expect("abba").toMatch(/([abcd])\1/);//these are testing the regexp actually
    //real test below
    expect(simon.getBotSequence()).not.toMatch(/([abcd])\1/);
  });

  it("should evaluate to incorrect input when player input is wrong", function(){
    simon.prepareBotSequence();
    simon.preparePlayerSequence("e");
    //sending a char that may not be in bot sequence
    expect(simon.evaluateGameStatus(true)).toEqual("Game Over"); //strict=true;
  });

  it("should evaluate to incorrect input when player input is wrong", function(){
    simon.prepareBotSequence();
    simon.preparePlayerSequence("e");
    //sending a char that may not be in bot sequence
    expect(simon.evaluateGameStatus(false)).toEqual("Try Again"); //strict =false
  });

  it("should evaluate to correct input when partial player sequence matches", function(){
    simon.prepareBotSequence();
    simon.prepareBotSequence();
    simon.preparePlayerSequence(simon.getBotSequence()[0]);
    //sending one char that matches first char in bot sequence
    expect(simon.evaluateGameStatus(true)).toEqual("Correct Input");
  });

  it("should evaluate to success when player completes current sequence", function(){
    simon.prepareBotSequence();
    simon.prepareBotSequence();
    simon.preparePlayerSequence(simon.getBotSequence()[0]);
    simon.preparePlayerSequence(simon.getBotSequence()[1]);
    //sending a char that may not be in bot sequence
    expect(simon.evaluateGameStatus(true)).toEqual("Next Level");
  });

  it("should evaluate to game off when player inputs before bot starts", function(){
    simon.preparePlayerSequence("a");
    expect(simon.evaluateGameStatus(true)).toEqual("Game Off");
  });

  it("should evaluate to win when player completes max length of the game", function(){
    for(var i=0;i<simon.maxLength;i++){
      simon.prepareBotSequence();
      simon.preparePlayerSequence(simon.getBotSequence()[i]);
    }
    //sending a full length that matches bot sequence
    expect(simon.evaluateGameStatus(true)).toEqual("You Win");
  });

  it("clearBotSequence should empty bot sequence", function(){
    for(var i=0;i<simon.maxLength;i++)
      simon.prepareBotSequence();
    simon.clearBotSequence();
    expect(simon.getBotSequence()).toEqual("");
  });

  it(" should empty player sequence", function(){
    simon.preparePlayerSequence("a");
    expect(simon.getPlayerSequence()).toEqual("a");
    simon.clearPlayerSequence();
    expect(simon.getPlayerSequence()).toEqual("");
  });

  it(" should prepare player sequence ", function(){
    simon.preparePlayerSequence("a");
    simon.preparePlayerSequence("b");
    expect(simon.getPlayerSequence()).toEqual("ab");
    simon.clearPlayerSequence();
    expect(simon.getPlayerSequence()).toEqual("");
  });

});
