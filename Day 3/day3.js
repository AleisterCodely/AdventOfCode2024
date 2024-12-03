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
    const regexp = /mul\(\d{1,3},\d{1,3}\)/g
    let matching = []

    //Go through the array and match all the muls with regex rule
    for(let i=0;i<inputArray.length;i++){
        const match = [...inputArray[i].matchAll(regexp)]
        matching.push(match);
    }

    let total = 0;
    //Go through the matches for the muls, Jesus...
    for(let i=0;i<matching.length;i++){
        for(let j=0;j<matching[i].length;j++){
            for(let k=0;k<matching[i][j].length;k++){
                total+=multiply(matching[i][j][k])
            }
        }
    }

    console.log("Part 1 answer: " + total)
})

const multiply = (mult) => {
    let factors = []
    factors[0] = Number(mult.slice(mult.indexOf('(')+1, mult.indexOf(',')));
    factors[1] = Number(mult.slice(mult.indexOf(',')+1, mult.indexOf(')')));
    return factors[0]*factors[1]
}