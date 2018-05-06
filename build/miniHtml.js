const minify = require('html-minifier').minify,
  fs = require('fs'),
  config = require(__dirname + '/html-mini-config.json').data;

const encoding = 'utf8',
  dist = __dirname + '/../dist/';

const htmlPages = [
  'index', 
  'cookies', 
  'pasta',
  'reads',
  'haikus',
  'about'
];

function minifyHtml() {
  htmlPages.forEach((item) => {
    try {
      const file = dist + item + '.html',
        data = fs.readFileSync(file);
      console.log('>>> ' + file + ' successfully read');
      const minifiedHtml = minify('' + data, config);
      console.log('>>> ' + file + ' successfully minified');
        
      fs.writeFile(file, minifiedHtml, encoding, error => {
        if (error) throw error;
        console.log('>>> ' + file + ' successfully rewritten');
      });
    } catch(err) {
      console.log('>>> !! error with ' + 'dist/' + item + '.html');
      console.error(err);
    }
  });
}
  
function main() {
  minifyHtml();
}
  
main();