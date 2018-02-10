# Garance's website

TODO: 
* Minify CSS
* Minify HTML
* Have a JS build system to apply transformations
To deploy on master: 
```shell
$ git ch master
$ git merge develop
$ npm run build
$ rm -rf CNAME README.md assets *.html css node_modules package-lock.json package.json #Everything except the `dist` directory
$ mv dist/* . # move the content of dist directory to main dir
$ git a --all
$ git co "push dist"
$ git ph origin master
```