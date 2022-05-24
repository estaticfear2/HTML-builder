const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.promises.stat(path.resolve(__dirname, 'secret-folder', file.name))
          .then((it) => {
            console.log(`${file.name.replace('.', ' - ')} - ${it.size}b`);
          });
      }
    });
  });
