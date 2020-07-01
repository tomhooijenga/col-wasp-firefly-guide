const glob = require('glob');
const sharp = require('sharp');
const mkdirp = require('mkdirp');
const path = require('path');

glob('./source/**/*.jpg', async (error, files) => {
  await Promise.all(files.map( async (file) => {

    const destination = file.replace('./source', './img').replace('.jpg', '');
    console.log(file, destination);

    await mkdirp(path.dirname(destination));
    await sharp(file)
      .resize({width: 1000})
      .webp()
      .toFile(destination + '.webp');

    await sharp(file)
      .webp()
      .toFile(destination + '-large.webp');
  }))
});
