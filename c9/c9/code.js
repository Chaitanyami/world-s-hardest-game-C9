var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create platform for sam to stand//

var platform = createSprite(50, 200,100,200);
platform.shapeColor='yellow';

//creating optical store//

var opticalstore = createSprite(350, 200,100,200);
opticalstore.shapeColor='cyan';

//creating walls//

var wall1 = createSprite(200, 100,400,10);
var wall2 = createSprite(200, 300,400,10);

//creating sam//

var sam = createSprite(50, 200,20,20);
sam.shapeColor='green';

//creating cars//

var car1 = createSprite(125, 125,20,20);
var car2 = createSprite(175, 275,20,20);
var car3 = createSprite(225, 125,20,20);
var car4 = createSprite(275, 275,20,20);

car1.shapeColor='red';
car2.shapeColor='red';
car3.shapeColor='red';
car4.shapeColor='red';

//applying velocity to cars//

car1.velocityY=8;
car2.velocityY=-8;
car3.velocityY=8;
car4.velocityY=-8;

var score =0;

function draw() {
 background("white");

//bounceoff cars from walls//

car1.bounceOff(wall1);
car1.bounceOff(wall2);

car2.bounceOff(wall1);
car2.bounceOff(wall2);

car3.bounceOff(wall1);
car3.bounceOff(wall2);

car4.bounceOff(wall1);
car4.bounceOff(wall2);

//make sam move//

if (keyDown(RIGHT_ARROW)) {
  
sam.x=sam.x+3;
  
}

if (keyDown(LEFT_ARROW)) {
  
sam.x=sam.x-3;
  
}

 //bring back sam to original position when touching cars 
  if (sam.isTouching(car1)||
  sam.isTouching(car2)||
  sam.isTouching(car3)||
  sam.isTouching(car4)) {
    sam.x=50;
    sam.y=200;
    score=score+1;
  }
  
  textSize(30);
  fill("red");
  text("Accidents:"+score, 200, 50);
  





drawSprites();
      
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
