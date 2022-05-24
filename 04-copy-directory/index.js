const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, 'files');
const dirToCopy = path.resolve(__dirname, 'files-copy');

fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true }, () => {
  fs.promises.mkdir(dirToCopy, {recursive: true})
  .then(() => {
    fs.readdir(dir, (err, files) => {
      files.forEach((file) => {
        fs.copyFile(path.resolve(dir, file), path.resolve(dirToCopy, file), () => {});
      });
    });
  });
});
