const readline = require('readline')
const fs = require('fs')

//Make arrays for our 'lists'
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
  let list1 = []
  let list2 = []
  for(let i=0;i<inputArray.length;i++){
    const listItems = inputArray[i].split("   ");
    list1.push(listItems[0])
    list2.push(listItems[1])
  }

  //Then sort the lists
  list1.sort(listOrder)
  list2.sort(listOrder)

  //Then do the magic for part 1
  let total = 0;
  for(let i=0;i<inputArray.length;i++){
    total += Math.abs(list1[i]-list2[i]);
  }

  console.log("Part 1 answer: " + total)

  //And now part 2
  total = 0
  for(let i=0;i<inputArray.length;i++){
    let matches = list2.filter((item)=>item === list1[i])
    total += list1[i] * matches.length;
  }

  console.log("Part 2 answer: " + total)
});

const listOrder = (item, item2)=>{
  if (item < item2) {
    return -1;
  } else if (item > item2) {
    return 1;
  }
  return 0;
}