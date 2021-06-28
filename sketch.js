var ground, groundImage;
var superman,superman_running,superman_punch,superman_fly,superman_die;
var invisibleground;
var gameOver,goImg,reset,resetImg;
var fireball,fireballImg,fireGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var people,p1,p2,p3,p4,P5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,peopleGroup;
var score = 0;
var life = 10;
var fireSound,supermanSound,winSound;

function preload() {
  
  groundImage = loadImage("back2.jpg");
  superman_running = loadAnimation("images/run1.png","images/run2.png","images/run3.png","images/run4.png","images/run5.png","images/run6.png","images/run7.png");
  superman_punch = loadAnimation("images/punch1.png","images/punch2.png","images/punch3.png","images/punch4.png","images/punch5.png");
  superman_fly = loadAnimation("images/fly1.png","images/fly2.png","images/fly3.png");
 superman_die = loadAnimation("images/die3.png");
  goImg = loadImage("gameover.png");
  fireballImg = loadAnimation("fire/fireball1.png","fire/fireball2.png","fire/fireball3.png","fire/fireball4.png","fire/fireball5.png","fire/fireball6.png","fire/fireball7.png","fire/fireball8.png");
  p1 = loadImage("people/p1.png");
  p2 = loadImage("people/p2.png");
  p3 = loadImage("people/p3.png");
  p4 = loadImage("people/p4.png");
  P5 = loadImage("people/p5.png");
  p6 = loadImage("people/p6.png");
  p7 = loadImage("people/p7.png");
  p8 = loadImage("people/p8.png");
  p9 = loadImage("people/p9.png");
  p10 = loadImage("people/p10.png");
  p11 = loadImage("people/p11.png");
  p12 = loadImage("people/p12.png");
  p13 = loadImage("people/p13.png");
  p14 = loadImage("people/p14.png");
  p15 = loadImage("people/p15.png");
  resetImg = loadImage("reset.png");
  
  fireSound = loadSound("sounds/fire.mp3");
  supermanSound = loadSound("sounds/superman.mp3");
  winSound = loadSound("sounds/win.wav");
}

function setup() {
  createCanvas(600, 200);

  ground = createSprite(300, 100, 1200, 200);
  ground.addImage("ground",groundImage)
  ground.velocityX = -2;
  ground.scale = 1;
  
  superman = createSprite(45,147);
  superman.addAnimation("running",superman_running);
  superman.addAnimation("fly",superman_fly);
  superman.addAnimation("punch",superman_punch);
  superman.addAnimation("die",superman_die);
  invisibleground = createSprite(34,210,200,10);
  invisibleground.visible = false;
  superman.debug = false;
  superman.setCollider("rectangle",0,0,20,superman.height);
  gameover = createSprite(310,105);
  gameover.addImage("go",goImg)
  gameover.scale = 0.3;
  gameover.visible = false;
    
  reset = createSprite(300, 180);
  reset.addImage("reset",resetImg);
  reset.scale = 0.03;
  reset.visible = false;
  
  fireGroup = new Group();
  peopleGroup = new Group();
  score =0;
  fireSound.play();
  supermanSound.play();
}

function draw() {
  background("#883257");
  if(gameState === PLAY){
    ground.velocityX = -2;
    //console.log(superman.y)
  if(ground.x<0){
    ground.x = ground.width/2
  }
  if(fireGroup.isTouching(superman)){
    superman.changeAnimation("die",superman_die);
    life = life - 1;
    gameState = END;
  }
    
  if(keyDown("space")&& superman.y>=144){
    superman.y = 52;
    superman.velocityY -=10
  }
  if(keyWentDown("up")){
    superman.y = 52;
    superman.velocityY -=10
    superman.changeAnimation("fly",superman_fly)
  }
  if(keyWentUp("up")){
    superman.changeAnimation("running",superman_running)
  }
  if(keyWentDown("right")){
    superman.changeAnimation("punch",superman_punch)
  }
  if(keyWentUp("right")){
    superman.changeAnimation("running",superman_running)
  }
  superman.velocityY=superman.velocityY+0.5
  superman.collide(invisibleground);
  SpawnPeople();
  SpawnFire();
    if(peopleGroup.isTouching(superman)){
    score+=1;
    peopleGroup[0].destroy();
    winSound.play();
  }
  
  }
  if(gameState === END){
    ground.velocityX = 0;
    superman.velocityY = 0;
    peopleGroup.setLifetimeEach(-1);
    fireGroup.setLifetimeEach(-1);
    peopleGroup.setVelocityXEach(0);
    fireGroup.setVelocityXEach(0);
    gameover.visible = true;
    reset.visible = true;
    
if(mousePressedOver(reset)) {
  if(life>0){
    restart();
  }
      
    }

//     }
  }
  
  drawSprites()
  fill("black");
  stroke("black");
  text("Click up arrow to make super man fly",20,14)
  text("Click right arrow to make super man punch",20,26);
  text("Score: "+score,489,21);
  text("Life: "+life,489,31);
  text(mouseX+","+mouseY,mouseX,mouseY)
}

function SpawnFire(){
  if(frameCount% 100 === 0){
    fireball = createSprite(600,160);
    fireball.addAnimation("fireball",fireballImg);
    fireball.scale = 0.5;
    fireball.velocityX = -4;
    fireGroup.add(fireball);
    fireball.lifetime = 300;
  }
}

function SpawnPeople(){
   if(frameCount% 150 === 0){
      people = createSprite(600,160);
      people.velocityX = -4;
     
     var rand = Math.round(random(1,15))
     switch(rand){
       case 1:people.addImage(p1);
         break;
       case 2:people.addImage(p2);
         break;
       case 3:people.addImage(p3);
         break;
       case 4:people.addImage(p4);
         break;
       case 5:people.addImage(P5);
         break;
       case 6:people.addImage(p6);
         break;
       case 7:people.addImage(p7);
         break;
       case 8:people.addImage(p8);
         break;
       case 9:people.addImage(p9);
         break;
       case 10:people.addImage(p10);
         break;
       case 11:people.addImage(p11);
         break;
       case 12:people.addImage(p12);
         break;
        case 13:people.addImage(p13);
         break;
       case 14:people.addImage(p14);
         break;
       case 15:people.addImage(p15);
         break;
       default:break;
     }
     people.scale = 0.05
     peopleGroup.add(people);
     people.lifetime = 300;
     
   }
}
function restart(){
  gameState = PLAY;
  gameover.visible = false;
  reset.visible = false;
  
  fireGroup.destroyEach();
  peopleGroup.destroyEach();
  
  superman.changeAnimation("running",superman_running);
  
 
  
  score = 0;
  
}

