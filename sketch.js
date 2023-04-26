// fazer o dino abaixar
var PLAY=1;
var END=0;
var gameState=PLAY;

var trex,trex_running,trex_collided;
var ground_image,ground,invisibleGround;

var score = 0;
var obstacle,obstaclesGroup;

var gameOverImg,gameOver;
var restartImg,restart;
var jumpSound,dieSound,checkpointSound;

function preload(){ //função que carrega imagens, sons e animações
       trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
       trex_collided = loadImage("trex_collided.png");

       groundImage = loadImage ("ground2.png");


       


       gameOverImg = loadImage("gameOver.png");
       restartImg = loadImage("restart.png");

       jumpSound = loadSound("jump.mp3");
       dieSound = loadSound("die.mp3");
       checkpointSound = loadSound("checkpoint.mp3");
}

function setup(){ //quando um codigo é executado
       createCanvas(600,200)
       trex = createSprite(50,160,20,50);
       trex.addAnimation("running",trex_running);
       trex.addAnimation("collided",trex_collided);
       trex.scale = 0.5;
       trex.setCollider("circle",0,0,40);

       ground = createSprite(200,190,400,20);
       ground.addImage("ground",groundImage);

       gameOver = createSprite(300,100);
       gameOver.addImage(gameOverImg);
       gameOver.scale=0.5;
       gameOver.visible = false;

       restart = createSprite(300,140);
       restart.addImage(restartImg);
       restart.scale = 0.5;
       restart.visible = false;
 
       ground.x=ground.width/2;
       invisibleGround = createSprite(200,190,400,10);
       invisibleGround.visible=false;

       obstaclesGroup = new Group();


}

function draw(){
       background(255)
       fill("black");
       text("Score: "+score,500,50);


       if(gameState === PLAY) {
              gameOver.visible = false;
              restart.visible = false;
       score = score+Math.round(frameCount/60);
       ground.velocityX = -(6 + 1.355*score/1000);
       if(ground.x < 0) {
       ground.x = ground.width/2;
       }
       if(keyDown("space") && trex.y >= 160) {
       trex.velocityY = -10;
       jumpSound.play();
       }
       trex.velocityY = trex.velocityY+0.5;
       if (score % 1000 === 0 & score>0) {
       checkpointSound.play();
       }
       spawnObstacles();
       if(obstaclesGroup.isTouching(trex)) {
       gameState = END;
       dieSound.play();
       }
       }
       else if(gameState === END) {
       ground.velocityX = 0;

       obstaclesGroup.setVelocityXEach(0);
       obstaclesGroup.setLifetimeEach(-1);


       gameOver.visible = true;
       restart.visible = true;

       trex.changeAnimation("collided",trex_collided);
       trex.velocityY = 0;

       if(keyDown("SPACE")) {
              reset();
       }

       }

       trex.collide(invisibleGround);


 drawSprites();
}
function reset(){
       gameState = PLAY;
       obstaclesGroup.destroyEach();
       trex.changeAnimation("running");
       score = 0;
     
     }

function spawnObstacles () {
       if (frameCount % 55 === 0) {
       var obstacle = createSprite(600,165,20,80);
       obstacle.shapeColor="Black"
       obstacle.velocityX = -(6 + score/1000);
       

       obstaclesGroup.add(obstacle);
       obstacle.scale = 0.5;
       obstacle.lifetime = 120;

  }

}
