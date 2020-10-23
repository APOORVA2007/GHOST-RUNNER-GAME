var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var ghost, ghostImage, ghostImage_jump;
var invisibleBlock,invisibleBlocksGroup ;
var gameState = "play";
var spookySound;
var score;

function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage_jump = loadImage("ghost-jumping.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300, 30,30);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  score = 0;
  
}

function draw(){
  
  background("black");
  
  
  if(gameState == "play"){
    
  
  if(tower.y >= 600){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -7;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;    
  }
  
  if(invisibleBlocksGroup.isTouching(ghost) || 
     ghost.y > 600 ||
     ghost.y < 0 ||
     ghost.x > 600 ||
     ghost.x < 0){
    
    ghost.destroy();
    gameState = "end";
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
   
  spawnDoor();
  
  drawSprites();
    
  score = score + Math.round(getFrameRate()/60);
  textSize = 15;   
  textColor = "white";  
  text("Score: " + score, 500, 570)  
  }
  
  if(gameState == "end"){
    textSize = 100;
    textColor = "red";
    text("Game Over!!",270, 300);
  }
  
}

function spawnDoor(){
  
 if(frameCount % 200 == 0){
   
   door = createSprite(250, -50, 20, 20);
   door.addImage(doorImage);
   door.x = Math.round(random(100,450));
   door.velocityY = 2;
   door.lifetime = 300;
   
   ghost.depth = door.depth + 1;
   
   climber = createSprite(250, 0,10,10)
   climber.addImage(climberImage);
   climber.x = door.x;
   climber.velocityY = 2;
   climber.lifetime = 300;
   
   invisibleBlock = createSprite(250,5,80,10);
   invisibleBlock.velocityY = 2;
   invisibleBlock.x = door.x;
   invisibleBlock.lietime = 300;
   invisibleBlock.visible = false;
   
   climbersGroup.add(climber);
   doorsGroup.add(door);
   invisibleBlocksGroup.add(invisibleBlock);
   
 }
  
  
}