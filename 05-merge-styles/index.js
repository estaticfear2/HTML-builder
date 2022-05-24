const fs = require('fs');
const path = require('path');

const outputFile = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

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
