// Modules //
const Handlebars = require('handlebars'),
  fs = require('fs'),
  util = require('util'),
  mainData = require(__dirname + '/../src/data/templates.json').data,
  recipesData = require(__dirname + '/../src/data/recipes.json').data;

const readFile = util.promisify(fs.readFile);

  // Constants //
const encoding = 'utf8',
  dist = __dirname + '/../dist/',
  src = __dirname + '/../src/';

const isHbs = file => file.indexOf(".hbs") >= 0,
	filenameWithoutExtension = item => item.substring(0, item.indexOf('.')),
	partials = fs.readdirSync(src + 'partials'),
	pages = fs.readdirSync(src + 'pages').filter(isHbs),
	recipesPages = fs.readdirSync(src + 'pages/recipes');

function compileDoc(source, data, output) {
    const template = Handlebars.compile(source);
    const html = template(data);
    fs.writeFile(dist + filenameWithoutExtension(output) + '.html', html, encoding, error => {
        if (error) throw error;
        console.log('>>> dist/'+ filenameWithoutExtension(output) + '.html successfully written');
    });
}

function readAndWriteToDist(item, templatingInfo, additionalPath) {
	const path = additionalPath || '';
	readFile(src + 'pages/' + path + item)
		.catch(err => {
			console.log('>>> !! error reading ' + 'src/pages/' + item);
			console.error(err);
		})
		.then((data) => {
			console.log('>>> src/pages/' + item + ' successfully read');
			compileDoc('' + data, templatingInfo, item);
		})
		.catch(err => {
			console.log('>>> !! error compiling ' + 'src/pages/' + item);
			console.error(err);
		});
}
async function compileTemplates() {
  pages.forEach(item => {
	  if (filenameWithoutExtension(item) === 'cooking') {
		  mainData[filenameWithoutExtension(item)].recipes = recipesData;
	  }
    readAndWriteToDist(item, mainData[filenameWithoutExtension(item)]);
  });
  recipesPages.forEach(item => {
    readAndWriteToDist(item, recipesData[filenameWithoutExtension(item)], 'recipes/');
  });
}

function compilePartials() {
  partials.forEach((item) => {
    try {
    const data = fs.readFileSync(src + 'partials/' + item);
      console.log('>>> src/partials/' + item + ' successfully read');
      Handlebars.registerPartial(filenameWithoutExtension(item), '' + data);
    } catch(err) {
      console.log('>>> !! error with ' + 'src/partials/' + item);
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
