const fs = require('fs');
const postcss = require('postcss');
const cssnano = require('cssnano');

const encoding = 'utf8',
  dist = __dirname + '/../dist/css/',
  src = __dirname + '/../src/css/';
  const cssPages = fs.readdirSync(src);

function throughPostCSS() {
    cssPages.forEach((item) => {
      try {
        const fileSrc = src + item,
            fileDist = dist + item;
        fs.readFile(fileSrc, (err, css) => {
          if (err) throw err;
          console.log('>>> successfully read ' + fileSrc);
            postcss([cssnano])
                .process(css, { from: fileSrc, to: fileDist })
                .then(result => {
                    fs.writeFile(fileDist, result.css, encoding, error => {
                        if (error) throw error;
                        console.log('>>> ' + fileSrc + ' successfully rewritten');
                      });
                    if ( result.map ) fs.writeFile(fileDist + '.map', result.map, encoding);
                })
                .catch(err => {
                    console.log('>>> !! error in postcss processing of  ' + 'dist/' + item);
                    console.error(err);
                });
        });
      } catch(err) {
        console.log('>>> !! error with ' + 'dist/' + item);
        console.error(err);
      }
    });
  }

  function main() {
    throughPostCSS();
  }

  main();