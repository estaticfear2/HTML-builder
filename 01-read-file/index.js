const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));
let data = '';

stream.on('data', (chunk) => console.log(data += chunk));