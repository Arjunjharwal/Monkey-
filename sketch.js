var PLAY = 1;
var END = 0;
var gameState = PLAY;



  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage, obstacle1Img, obstacle2Img, obstacle3Img;
  var FoodGroup, obstacleGroup;
  var ground, dreamBananaImage, dreamBanana, hanger, hangerLine;
  
var score;
var survivalTime = 0; 


  function preload(){
    
    obstacleImage = loadImage("obstacle.png");

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    
   obstacle1Img = loadImage("e529a985fbd2671b43973dc509d21c93-rubble-rock-by-vexels.png");
   obstacle2Img = loadImage("63531ef59252017e7bd91cad6f7b6200-flat-stone-illustration-by-vexels.png");
   obstacle3Img = loadImage("77426e4c16c6ff0faac3f7ea96208c9b-slabstone-by-vexels.png");
    
    dreamBananaImage = loadImage("9797717cb12980b66129c8634049df59-banana-hand-drawn-fruit-by-vexels.png");
    
  }



function setup() {
  createCanvas(500,500);
  
  
  
  monkey = createSprite(50,380,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(250,460,10000,100);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  
  
  dreamBanana = createSprite(250,250,50,50);
  dreamBanana.addImage(dreamBananaImage);
  dreamBanana.scale = 0.2;
  
  hangerLine = createSprite(290,110,1,230);
  
  
  
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  
  
  monkey.setCollider("rectangle",0,0,80,monkey.height);
  monkey.debug = false;
  
  score = 0;
  
}

function draw() {
 background(3, 252, 240);
  
  
  
  if(gameState === PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
   else if (gameState === END) {

      ground.velocityX = 0;
      monkey.velocityY = 0;
      
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);    
   }
  
    ground.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
    hangerLine.depth = dreamBanana.depth;
    dreamBanana.depth = dreamBanana.depth + 1;
 
  //stop trex from falling down
  monkey.collide(ground);
  
  
  
     stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("survival Time: " + survivalTime,200,30);

    
  
    drawSprites();
  
  }

  function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,400,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;        
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,350));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
}