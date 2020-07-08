const glob = require('glob');
const sharp = require('sharp');
const mkdirp = require('mkdirp');
const path = require('path');

const options = {
  alphaQuality: 0,
  reductionEffort: 6,
}

glob('./source/**/*.jpg', async (error, files) => {
  await Promise.all(files.map(async (file) => {

    const destination = file
      .replace('./source', './img')
      .replace('.jpg', '');

    await mkdirp(path.dirname(destination));

    const small = sharp(file)
      .resize({width: 1000})
      .webp(options)
      .toFile(destination + '.webp');

    const large = sharp(file)
      .resize({width: 2500})
      .webp(options)
      .toFile(destination + '-large.webp');

    await Promise.all([
      small,
      large,
    ]);

    console.log(file);
  }));
});
