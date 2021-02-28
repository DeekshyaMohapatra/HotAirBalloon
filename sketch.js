
var backimg,back;
var balloon,balloonpic;
var database,position;

function preload()
{
  backimg = loadImage("Hot Air Ballon-01.png");

  balloonpic =loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}


function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1200,700);

  
  back=createSprite(580, 290, 50, 50);
  back.addImage("background", backimg);
  back.scale=0.5

  balloon=createSprite(300,400,100,100);
  balloon.addAnimation("balloon",balloonpic);
  balloon.scale=0.9

  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError);

}

function draw() {
  background("yellow");
  
  if(keyDown(LEFT_ARROW))
  {
    balloon.x=balloon.x-10
  }
   if(keyDown(RIGHT_ARROW))
  {
    balloon.x=balloon.x+10
  }
  
   if (keyDown(DOWN_ARROW))
  {
    balloon.y=balloon.y+10
    balloon.scale=balloon.scale+0.01
  }

   if(keyDown(UP_ARROW))
  {
    balloon.y=balloon.y-10
    balloon.scale=balloon.scale-0.01
  }




  drawSprites();
  fill("black")
  textSize(20)
  text("Use Arrows To Move The HotAirBalloon",800,100)
}



function updateHeight(x,y)
{
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readPosition(data)
{
 position=data.val();
  console.log(position.x)
  balloon.x=position.x;
  balloon.y=position.y;
}



function showError()
{
  console.log("Error in writing the database");
}