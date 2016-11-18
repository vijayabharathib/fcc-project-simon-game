/**
  * wait until the doc is ready to obey orders
  */
  var simon; //start with blank
  var gameView;
  var controller;
document.addEventListener("DOMContentLoaded",function(e){
  /**
    * once content is loaded
    */
  simon=new Simon();
  gameView=new GameView();
  controller=new Controller();

  startButtonHandler();
  playerClickHandler();
  setupKeyHandlers();
});


/**
  * start the game
  */
function startButtonHandler(){

  var start=document.querySelector("#start");
  start.onclick=gameView.startTheGame;
}


/**

  */
function playerClickHandler(){

  /**
    */
  var buttons=document.querySelectorAll(".game button.keypad");
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=gameView.gamePadClickHandler;
  }

  var toggles=document.querySelectorAll(".strict .toggle span");
  toggles[0].onclick=gameView.toggleStrictMode;
  toggles[1].onclick=gameView.toggleStrictMode;
}



function setupKeyHandlers(){
  document.onkeypress=function(event){
    var c=event.key.toLowerCase();
    console.log('keypress:'+c);
    switch(c){
      case 'a':
      case 'b':
      case 'c':
      case 'd':
        var block=document.querySelector("#" +c);
        block.click();
        break;
    }
  };

}
