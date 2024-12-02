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
  let levelsArray = [];

  //Do magic for part 1
  let total = 0;
  for(let i=0;i<inputArray.length;i++){
    levelsArray = inputArray[i].split(" ");
    
    if(checkSafety(levelsArray)){
      total++
    }
  }
  console.log("Part 1 answer: " + total);

  //Then part 2
  total = 0;
  for(let i=0;i<inputArray.length;i++){
    levelsArray = inputArray[i].split(" ");
    let dampenerTriggered = false;

    for (let j = 0; j < levelsArray.length; j++) {
      const singleLevel = levelsArray.slice(0, j).concat(levelsArray.slice(j + 1));
      if (checkSafety(singleLevel)) {
        dampenerTriggered = true;
        break;
      }
    }

    if (dampenerTriggered) {
      total++;
    }
  }

  console.log("Part 2 answer: " + total)
});

const checkSafety = (levelsArray) => {
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
        return true;
      }
    }
  }
}
