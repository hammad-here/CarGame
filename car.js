let lastColor="yellow"
let blockTagList=[]
let blockObjList=[]
let score=0;

//function to create block elements
function creatingBlockTags(parentId,marginleft){
   let block = document.createElement("span")
   block.style.background=lastColor
   block.setAttribute("class","block")
   block.style.marginLeft=marginleft + "vw"
   document.getElementById(parentId).append(block)
   blockTagList.push(block)
   blockObjList.push({marginLeft:100})
   setTimeout(()=>{
       document.getElementById(parentId).removeChild(block) 
       blockTagList.shift()  
       blockObjList.shift()  
   },12000)
}

//moving blocks
let movingBlocks = setInterval(()=>{
    for(let i=0;i<=blockTagList.length-1;i++){
     blockObjList[i].marginLeft-=0.7
     blockTagList[i].style.marginLeft=blockObjList[i].marginLeft+"vw"
    }
},30)
           
//making new blocks
let makingNewBlocks = setInterval(()=>{
    creatingBlockTags("up",100)
    creatingBlockTags("down",100)
    lastColor = lastColor=="yellow"?"black":"yellow" 
},500)
               
//function to create white lines
function createWhitetags(){
    let white = document.createElement("span")
    white.style.position="absolute"
    white.style.marginTop="37vh"
    white.style.marginLeft="100vw"
    white.style.width="30vw"
    white.style.height="6vh"
    white.style.background="white" 
    white.style.border="5px solid black"
    document.getElementById("road").append(white) 
    blockTagList.push(white)
    blockObjList.push({marginLeft:100})
    setTimeout(()=>{
        document.getElementById("road").removeChild(white)
        blockObjList.shift()
        blockTagList.shift()
    },12000)
}

//creating white lines
let makingWhiteLines=setInterval(()=>{
    createWhitetags()
},3000)

//function to move main car based on key pressed
let carTopMargin=10
let carLeftMargin=0;
function moveCar(dir){
    console.log(dir);
    if(dir=="ArrowUp"){
        carTopMargin-=1.2 
    }else if(dir=="ArrowDown"){
        carTopMargin+=1.2
    }else if(dir=="ArrowRight"){
        carLeftMargin+=0.7
    }else if(dir=="ArrowLeft"){
        carLeftMargin-=0.7
    }
    document.getElementById("main-car").style.marginTop=carTopMargin+"vh"
    document.getElementById("main-car").style.marginLeft=carLeftMargin+"vw"
}

//moving main car
document.addEventListener("keydown",(e)=>{
 moveCar(e.key) 
})

let carsLoc=["car1.jpeg","car3.jpg","car4.jpg"]
let carDetail=[]
let carTages=[]

//creating car images
function carMaking(){
let car = document.createElement("img")
car.setAttribute("src","assets\\"+carsLoc[Math.floor(Math.random()*3)])
car.setAttribute("class","car")
car.style.marginLeft=80+"vw"
let carObj={leftMargin:80}
 carObj.topMargin = Math.floor(Math.random()*2)*40+10
 carObj.speed = Math.random()*(0.45-0.25) + 0.2
car.style.marginTop=carObj.topMargin+"vh"
document.getElementById("road").appendChild(car)
carTages.push(car)
carDetail.push(carObj)
setTimeout(()=>{
    document.getElementById("road").removeChild(car)
    carDetail.shift()
    carTages.shift()
    score+=1
    document.getElementById("score").innerText=score
},4000)
}

//making new cars
let makingNewCars = setInterval(()=>{
    carMaking()
},3000)

//moving all cars
let movingAllCars = setInterval(()=>{
 for(let i=0;i<=carDetail.length-1;i++){   
   carDetail[i].leftMargin-=carDetail[i].speed
   carTages[i].style.marginLeft=carDetail[i].leftMargin + "vw"
 }
 CheckGameOver()
},10)

//checking conditions if game is over or not
function CheckGameOver(){
   if(carTopMargin<0||carTopMargin>60||carLeftMargin<=-20||carLeftMargin>=120){
    gameOver()
   }else{
    for(let i=0;i<=carDetail.length-1;i++){
      if(
        // cars are overlaping horizontally
      (carDetail[i].leftMargin<carLeftMargin+18&&carDetail[i].leftMargin+18>carLeftMargin)
      &&
        // cars are overlaping vertically
      (carTopMargin+18>carDetail[i].topMargin&&carDetail[i].topMargin+18>carTopMargin)
        )
      {
        gameOver()
      }
    }
   }
}

function gameOver(){
    clearInterval(makingNewCars)
    clearInterval(movingAllCars)
    clearInterval(makingNewBlocks)
    clearInterval(movingBlocks)
    clearInterval(makingWhiteLines)
    let game_over=document.createElement("div")
    game_over.style.position="absolute";
    game_over.style.fontSize = 20 +"vh"
    game_over.style.fontFamily = "Impact"
    game_over.style.marginLeft = 30+"vw"
    game_over.style.color="white"
    game_over.style.zIndex=10
    game_over.innerText="GAME OVER!!!"
    document.getElementById("road").appendChild(game_over)
}