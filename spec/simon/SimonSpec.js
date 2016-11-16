describe("Simon", function(){
  var Simon = require('../../app/scripts/Simon');
  var simon;

  beforeEach(function(){
    simon=new Simon();
  });

  it("should be able to create a sequence", function(){
    simon.prepareBotSequence();
    expect(simon.botSequence.length).toEqual(1);

  });

  it("should contain only a,b,c or d",function(){
    simon.prepareBotSequence();
    expect(simon.botSequence).toMatch(/^[abcd]+$/);
  });

  it("should not contain repetitive pattern aa,bb,cc or dd", function(){
    for(var i=0;i<25;i++)
      simon.prepareBotSequence();
    expect(simon.botSequence.length).toEqual(25);
    expect("abc").not.toMatch(/([abcd])\1/); //these are testing the regexp actually
    expect("abcdabcd").not.toMatch(/([abcd])\1/);//these are testing the regexp actually
    expect("abba").toMatch(/([abcd])\1/);//these are testing the regexp actually
    //real test below
    expect(simon.botSequence).not.toMatch(/([abcd])\1/);
  });

  it("should evaluate to incorrect input when player input is wrong");
  it("should evaluate to correct input when player sequence matches");
  it("should evaluate to success when player completes current sequence");
  it("should evaluate to win when player completes max length of the game");
});
