const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, 'assets');
const dirToCopy = path.resolve(__dirname, 'project-dist', 'assets');

const copyDir = (dirName, dirNameToCopy) => {
  return fs.promises.mkdir(dirNameToCopy, {recursive: true})
    .then(() => {
      fs.readdir(dirName, {withFileTypes: true}, (err, files) => {
        files.forEach((file) => {
          if (file.isDirectory()) {
            copyDir(path.resolve(dirName, file.name), path.resolve(dirNameToCopy, file.name));
          } else {
            fs.promises.copyFile(path.resolve(dirName, file.name), path.resolve(dirNameToCopy, file.name));
          }
        });
      });
    });
};

const copyStyles = () => {
  const outputFile = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));

  fs.promises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true})
    .then((files) => {
      files.forEach((file) => {
        if (file.isFile() && file.name.split('.')[1] === 'css') {
          const stream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name));
          let data = '';

          stream.on('data', (chunk) => outputFile.write(data += chunk + '\n'));
        }
      });
    });
};

const copyHtml = () => {
  let html = {};
  fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf-8')
    .then(async (data) => {
      const matches = data.match(/{{\w{1,}}}/gm);

      for (let i = 0; i < matches.length; i++) {
        const fileName = matches[i].slice(2, -2);
        const text = await fs.promises.readFile(path.resolve(__dirname, 'components', `${fileName}.html`), 'utf-8');

        html[fileName] = text;
      }

      return data;
    })
    .then(data => data.replace(/{{\w{1,}}}/gm, (match) => html[match.slice(2, -2)]))
    .then(data => fs.promises.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), data));
};

fs.rm(path.resolve(__dirname, 'project-dist'), { recursive: true, force: true }, () => {
  copyDir(dir, dirToCopy)
    .then(() => {
      copyStyles();
      copyHtml();
    });
});
