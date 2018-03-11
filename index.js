// Modules //
const Handlebars = require('handlebars'),
  fs = require('fs');

  // Constants //
const encoding = 'utf8';

// Templates data //
const data = {
    home: {
        subtitle: 'Home',
        css: [
            'css/main.css'
        ]
    }, 
    pasta: {
        subtitle: 'Pasta cooking sheet',
        css: [
            'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css',
            'https://fonts.googleapis.com/css?family=Lora',
            'css/pasta.css'
        ]
    },
    cookies: {
        subtitle: ' Classic cookies',
        css: [
            'css/main.css',
            'css/recipe.css'
        ]
    }
};

const compileDoc = (source, data, output) => {
    const template = Handlebars.compile(source);
    const html = template(data);
    fs.writeFile('dist/'+ output + '.html', html, encoding, (error) => {
        if (error) throw error;
    });
}
const compileCookies = (error, source) => {
    if (error) throw error;
    compileDoc(source, data.cookies, 'cookies');
}
const compilePasta = (error, source) => {
    if (error) throw error;
    compileDoc(source, data.pasta, 'pasta');
}
const compileIndex = (error, source) => {
    if (error) throw error;
    compileDoc(source, data.home, 'index');
}

const compileTemplates = () => {
    fs.readFile('src/index.hbs', encoding, compileIndex);
    fs.readFile('src/pages/cookies.hbs', encoding, compileCookies);
    fs.readFile('src/pages/pasta.hbs', encoding, compilePasta);
}
const registerTwitter = (error, source) => {
    if (error) throw error;
    Handlebars.registerPartial('twitter', source);
    
    compileTemplates();
}
const registerFooter = (error, source) => {
    if (error) throw error;
    Handlebars.registerPartial('footer', source);
    
    fs.readFile('src/templates/twitter.hbs', encoding, registerTwitter);
}
const registerHead = (error, source) => {
    if (error) throw error;
    Handlebars.registerPartial('head', source);
    fs.readFile('src/templates/footer.hbs', encoding, registerFooter);
}
fs.readFile('src/templates/head.hbs', encoding, registerHead);
