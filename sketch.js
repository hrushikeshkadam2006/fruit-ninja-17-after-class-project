var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword;
var fruit;
var monster;
var swordImage,fruit1,fruit2,fruit3,fruit4,monsterImage;
var fruitGroup;
var score;
var gameOverImage;
var knifeSwooshSound;
var GameOverSound;
var position;

function preload(){
  
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruitImage = loadAnimation("fruit1.png","fruit2.png","fruit3.png","fruit4.png");
  
  gameOverImage = loadImage('gameover.png');
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
  GameOverSound = loadSound("gameover.mp3");
  
  
 
}

function setup(){
  
  createCanvas(600,600);
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  score = 0;
}

function draw(){
  background("lightblue");
  text("score:"+score,300,30);
  
  if(gameState === PLAY){
      sword.y = World.mouseY
      sword.x = World.mouseX
      fruits();
      Enemy();
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
      knifeSwooshSound.play();
    } else{
      if(enemyGroup.isTouching(sword)){
        gameState = END;
        GameOverSound.play();
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        sword.addImage(gameOverImage);
        sword.X = 200;
        sword.Y = 200;
      }
    }
  }
  
  
  drawSprites();

}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    position = Math.round(random(1,2));
    if(position === 1){
      fruit.x = 400;
      fruit.velocityX = -(7 + (score/4));
    }else{
      if(position === 2){
        fruit.x = 0;
        fruit.velocityX = (7+(score/4));
      }
    }
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1){
     fruit.addImage(fruit1)
    }else if(r == 2){
     fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    } else {
     fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit); 
  }
}

function Enemy(){
if(World.frameCount%200===0){
  monster = createSprite(400,200,20,20);
  monster.addAnimation("running monster",monsterImage)
  monster.y = Math.round(random(100,300));
  monster.velocityX = -(8+(score/10));
  monster.setLifetime = 50;
  enemyGroup.add(monster);
}  
}











