//Create variables here
var dog, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database;

  var dogs = createSprite(200, 200, 20, 20);
  dogs.addImage(dog);

  foodObj = new Food(foodStock, lastfed);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref("Food");
  foodStock.on("value, readstock");
}


function draw() {  

  background(46, 139, 87);

  fedTime = database.ref("Feed Time");
  fedTime.on("value", function(data){
    lastFed = data.val;
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " +lastfed%12+"PM", 350,30);
  }
  else if(lastFed===0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed: "+lastFed+"AM",350,30);
  }

  foodObj.display();

  drawSprites();

  //add styles here
  textSize(25);
  fill("red");
  text(foodStock, 180, 70)
  stroke();
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock,
    FeedTime:hour()
  })
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

