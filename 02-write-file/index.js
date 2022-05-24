const fs = require('fs');
const path = require('path');

const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const file = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

readLine.write('Enter your text below\n');

readLine.on('line', (text) => {
  if (text === 'exit') {   
    readLine.close();
  } else {
    file.write(text + '\n');
  }
});

readLine.on('close', () => console.log('Saved in the text.txt'));