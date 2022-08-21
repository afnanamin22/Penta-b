let currentIndex=0,x=0,y=0;
const directionArr=['North','East','South','West'];
let defaultDir=directionArr[currentIndex];
const obstaclesArr=[[1,4], [3,5], [7,4]];
let safePlaceStr='';
let tempArr=[];
let counter=0;
let c=document.getElementById('cmdStr');
let submitBtn=document.getElementById('submitBtn');
let saveRover=document.getElementById('saveRover');
let saveLbl= document.getElementById("saveLbl");

//part 1 to translate the command into an order that rover understands


 function translateOrder(Command) {
    for (let index = 0; index < Command.length; index++) {
       switch (Command[index]) {
        case 'f':
        case 'F':
            y+=1;
            break;

        case 'b':
        case 'B':
            y-=1;
            break;
            
        case 'r':
        case 'R':
            x+=1;
           currentIndex+=1;
           if(currentIndex>3)
           {
            currentIndex=0;
           }
            defaultDir=directionArr[currentIndex];
            break;

         case 'l':
         case 'L':
            x-=1;
            currentIndex-=1;
           if(currentIndex<0)
           {
            currentIndex=3;
           }
            defaultDir=directionArr[currentIndex];
            break;

          case " ":
            x=0;
            y=0;
            break;
       }
    }
   
  return[x,y]
}

//part 2 to check if there is an obstacle coming ahead or not

 function obstacleReport(dirX,dirY) {
   
for (let i = 0; i < obstaclesArr.length; i++) {
  for (let j = 0; j < obstaclesArr.length; j++) {
    if(((obstaclesArr[i][j]-dirX==1||dirX-obstaclesArr[i][j]==1) && obstaclesArr[i][j+1]-dirY==0)||(obstaclesArr[i][j]-dirX==0 &&(obstaclesArr[i][j+1]-dirY==1)||dirY-obstaclesArr[i][j+1]==1))
    {
       return true;
    }
   }  
}   
}

//To check whether there an obstacle coming ahead or not before giving rover the order to move

function moveRover() {
   translateOrder(c.value); 
   if(obstacleReport(x,y)==true) 
   {
    $("#resultLbl").text(`${x} ${y} ${defaultDir} "STOPPED"`);
    saveRover.style.visibility='visible'; //to show save rover button to move it to a new safe place
   }
  else
  {
    console.log(x,y,defaultDir)
    $("#resultLbl").text(`${x} ${y} ${defaultDir}`);
  }
  }
  
//part 3 to move Rover to a safe place

function moveToSafePlace() {

 let result=obstacleReport(x,y);
  if(result==true)
  {
    x+=1;
    counter+=1;
    moveToSafePlace();
  }  
  else
  {
    for (let i = 0; i < counter; i++) {
      tempArr.push('r');
    }
    safePlaceStr=tempArr.toString();
    saveLbl.style.visibility='visible'; // show the new coordinates that will take rover to someplace safe
    $('#saveLbl').text(`${safePlaceStr}`) // put the new coordinates value in the label
  }
}



window.onload=function(){
// when user clicks enter to get rover coordinates after giving him command

submitBtn.addEventListener('click',function(){
  moveRover();
  c.value=" ";
  saveLbl.style.visibility='hidden';  // to hide new coordinates label after moving rover to a safe place
})

//to get new safe coordinates for rover afrer pressing move to a safe place

saveRover.addEventListener('click',function(){
  moveToSafePlace();
  saveRover.style.visibility='hidden';  // to hide new coordinates button after moving rover to a safe place
})
}




//uncomment this line along with translateorder.test.js to test this function
//module.exports= translateOrder; 