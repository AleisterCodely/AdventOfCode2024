const readline = require('readline')
const fs = require('fs')

//Make arrays for our levels
let inputArray = [];

//Make a filestream reader
const reader = readline.createInterface({
  input: fs.createReadStream('./input.txt')
});

//Push each line to our array
reader.on('line', function(line) {
  inputArray.push(line);
});

//Once we've finished reading loop through the array, separate into 2 lists
reader.on('close', function(){
  //Add all levels to a levels array
  let levelsArray = [];
  let total = 0;
  for(let i=0;i<inputArray.length;i++){
    levelsArray = inputArray[i].split(" ");
    //Then check if the level is safe and update total
    let isDecreasing = false;
    let isIncreasing = false;
    
    for(let j=0;j<levelsArray.length-1;j++){
      const current = Number(levelsArray[j]);
      const next = Number(levelsArray[j+1]);

      if(Math.abs(current-next)>=4){
        break;
      }
      if(current!==next){
        if(j===0){
          current > next ? isDecreasing = true : isIncreasing = true;
        }
      } else {
        break;
      }
      if(isIncreasing && current > next){
        break;
      } else if(isDecreasing && current < next){
        break;
      } else {
        if(j+1>=levelsArray.length-1){
          total++
        }
      }
    }
  }
  console.log(total);
});
