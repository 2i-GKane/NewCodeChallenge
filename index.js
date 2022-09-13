const fs = require('fs');
const readLine = require('readline');

const run = async () => {
    //Fetch nums from file
    const numbers = await readFile();
    //Create a new Set with num array vals, spread into new array.
    //This is used to remove all duplicate vals
    const uniqueNumbers = [...new Set(numbers)];

    //Sort the numbers in a decending order using bubble sort (recursive)
    sort(uniqueNumbers, uniqueNumbers.length);
    console.log('Your sorted number sequence is: ');
    console.log(uniqueNumbers);
};

const readFile = async () => {
    //Used to store each number read from the file
    const nums = [];

    //Path of expected input
    const path = './nums.txt';
    //Create the file if it doesn't exist
    if (!fs.existsSync(path)) fs.createWriteStream(path, { overwrite: false });

    //Read each line from the file individually
    const lineReader = readLine.createInterface({
        input: fs.createReadStream(path),
    });

    //Loop through all the lines in the reader (Sync)
    for await (const line of lineReader) {
        //Attempt to parse the line (check if number), and ensure that it's not decimal
        //Push into num array
        if (parseInt(line) !== NaN && line % 1 == 0) nums.push(parseInt(line));
    }

    return nums;
};

const sort = (numArr, n) => {
    //Num is expected to initially be the length of the array
    //The array will already be sorted if only 1 entry
    if (n === 1) return;

    //Count the number of changes, so we know if it's actually sorting
    let changes = 0;

    //Loop through each item, due to the nature of this method
    //We expect that one item is sorted each time, so the working area is decreased with each invokation
    for (let i = 0; i < n - 1; i++) {
        //If the current number is less than the next one along, swap the positions
        if (numArr[i] < numArr[i + 1]) {
            const temp = numArr[i + 1];
            numArr[i + 1] = numArr[i];
            numArr[i] = temp;

            //Increase the change counter
            changes++;
        }
    }

    //If no changes were made, return as we don't want to keep iterating
    if (changes === 0) return;

    sort(numArr, n - 1);
};

run();
