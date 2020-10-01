class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
    this.allPlayerRank= 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }


  updatePlayerRank(count){
    var rankIndex = "players/player"+this.index;
    database.ref(rankIndex).update({
      rank:count
    })
  }

  getRank(){
    var playerRankIndex = database.ref('players/player'+ this.index);
    playerRankIndex.on("value",(data)=>{
    var playerData =data.val();
    playerRank = playerData.rank;
    //console.log(playerRank);
    })
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  }
  async getCarsAtEnd()
  {
  
   
    var carAtEndRef = await database.ref('carsAtEnd').once("value");;
   
    if(carAtEndRef.exists()){
      this.allPlayerRank = carAtEndRef.val();
     // console.log("getCarsAtEnd inside+"+this.allPlayerRank);
    }
  //  console.log("getCarsAtEnd+"+this.allPlayerRank);
  } 


  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();

    })
    
  }

 
  static updateCarsAtEnd(rank){
    database.ref('/').update({
      carsAtEnd:rank
    })
    console.log("carsAtEnd: " + rank)
  }
}
