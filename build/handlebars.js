// Modules //
const Handlebars = require('handlebars'),
  fs = require('fs'),
  util = require('util'),
  hbsData = require(__dirname + '/../src/templates.json').data;

const readFile = util.promisify(fs.readFile);

  // Constants //
const encoding = 'utf8',
  dist = __dirname + '/../dist/',
  src = __dirname + '/../src/';
const partials = [
    'head', 
    'footer', 
    'twitter'
  ], 
  pages = [
    'index', 
    'cookies', 
    'pasta',
    'reads',
    'haikus',
    'about'
  ];

const compileDoc = (source, data, output) => {
    const template = Handlebars.compile(source);
    const html = template(data);
    fs.writeFile(dist + output + '.html', html, encoding, error => {
        if (error) throw error;
        console.log('>>> dist/'+ output + '.html successfully written');
    });
}

async function compileTemplates() {
  pages.forEach(item => {
    readFile(src + 'pages/' + item + '.hbs')
    .catch(err => {
      console.log('>>> !! error reading ' + 'src/pages/' + item + '.hbs');
      console.error(err);
    })
    .then((data) => {
      console.log('>>> src/pages/' + item + '.hbs successfully read');
      compileDoc('' + data, hbsData[item], item);
    })
    .catch(err => {
      console.log('>>> !! error compiling ' + 'src/pages/' + item + '.hbs');
      console.error(err);
    });
  });
}

function compilePartials() {
  partials.forEach((item) => {
    try {
    const data = fs.readFileSync(src + 'partials/' + item + '.hbs');
      console.log('>>> src/partials/' + item + '.hbs successfully read');
      Handlebars.registerPartial(item, '' + data);
    } catch(err) {
      console.log('>>> !! error with ' + 'src/partials/' + item + '.hbs');
      console.error(err);
    }
  });
  return Promise.resolve();
}

function main() {
  compilePartials()
    .then(() => {
      compileTemplates();
    });
}

main();
