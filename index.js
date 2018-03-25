// Modules //
const Handlebars = require('handlebars'),
  fs = require('fs'),
  util = require('util'),
  hbsData = require('./src/templates.json').data;

const readFile = util.promisify(fs.readFile);

  // Constants //
const encoding = 'utf8';
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
    'haikus'
  ];

const compileDoc = (source, data, output) => {
    const template = Handlebars.compile(source);
    const html = template(data);
    fs.writeFile('dist/'+ output + '.html', html, encoding, (error) => {
        if (error) throw error;
    });
}

async function compileTemplates() {
  pages.forEach((item) => {
    readFile('src/pages/' + item + '.hbs').then((data) => {
      compileDoc('' + data, hbsData[item], item);
    });
  });
}

async function compilePartials() {
  partials.forEach((item) => {
    readFile('src/partials/' + item + '.hbs').then(data => {
      Handlebars.registerPartial(item, '' + data);
    });
  });
}

async function main() {
  await compilePartials();
  compileTemplates();
}

main();
