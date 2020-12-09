class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(200,200);
    car1.addImage(car1Image);
    car2 = createSprite(400,200);
    car2.addImage(car2Image);
    car3 = createSprite(600,200);
    car3.addImage(car3Image);
    car4 = createSprite(800,200);
    car4.addImage(car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getCarRank();


    if(allPlayers !== undefined){
       var index=0;
      var x=175;
      var y;
      background(groundImage);
      image(trackImage, 0, -displayHeight*4, displayWidth, displayHeight*5);
      for(var plr in allPlayers){
        index = index+1;
        x = x+200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x= x;
        cars[index-1].y=y;
        if(index === player.index){
          cars[index-1].shapeColor ="red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          
          if (index === 1){
            fill(255);
            ellipse(x,y,100,120);
          }else if (index === 2){
            fill(255, 81, 79);
            ellipse(x,y,100,120);
          }else if (index === 3){
            fill(0, 138, 225);
            ellipse(x,y,100,120);
          }else if (index === 4){
            fill(0);
            ellipse(x,y,100,120);
          }  
        }
      }
      }
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if (player.distance>4400){
        gameState = 2;
        player.rank += 1;
        Player.carUpdate(player.rank);
        
      }
      
      drawSprites()

  }
      end(){
      console.log("gameEnd");
      console.log(player.rank);
    }
  }

