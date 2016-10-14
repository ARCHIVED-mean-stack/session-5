#MEAN Session Four

`$cd` to sushi and run `$ sudo npm install`.

Use the default gulp task to run the page in the browser (re-examine the gulpfile). Note that Browser Sync offers a UI:

```sh
 ------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.8:3000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.8:3001
 ------------------------------------
```



##Sushi - Mobile First Navbar

Let's assume [this](http://daniel.deverell.com/mean-fall-2016/gulp/) is our goal. 

Review the CSS Tricks page on Flex settings.

In nav.scss remove `max-width: 140px;` and add:

```css
li {
  flex: 1 1 auto;
}
```

Note that, as it stands, our nav CSS is not mobile first. Move the span contents into the media query.

Move the span contents into the media query.

```css
span {
  display: none;
}
```

Make display adjustments to the nav bar (padding, icon size) and refactor the media queries so that they are distributed within thier respective selectors. 

Remove the jQuery material from both pages.

Here is the final navigation sass:

```css
.main-nav {
  background: #eee;
  margin-bottom: 1em;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  li {
    flex: 1 1 auto;
  }
  a {
    padding: 0.5rem 0.25rem;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    color: $reddish;
    background-color: $tan;
    &:hover, &:focus {
      background-color: $reddish;
      color: $white;
      svg {
        fill: $white; 
      }
      span {
        color: $white; 
      }
    }
    @media (min-width: $break-one) {
      font-size: 1.5rem;
      padding: 1.25rem 0.5rem;
    }
  }
  span {
    display: none;
    @media (min-width: $break-one) {
      display: block;
      font-size: 0.875rem;
      font-weight: normal;
      color: #888;
      margin: 0.25rem 0 0 0;
    }
  }
  .icon {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 0.5rem;
    fill: #999;
    @media (min-width: $break-one) {
      width: 40px;
      height: 40px;
      margin-right: 1rem;
    }
  }
}
```



##Server Accounts

* Username is the first seven letters of your last name + first letter of first name
* Password is first initial, last initial, 123890
* e.g. devereld // dd123890
* Hostname is oit2.scps.nyu.edu

Test to see if your account is active by entering this URL into a new browser tab (use your username after the tilde):
```
http://oit2.scps.nyu.edu/~pezuaj/
```

Try using an FTP client and then use SSH and cd into the web directory:

`$ ssh pezuaj@oit2.scps.nyu.edu`

Only the web directory has been configured to host external http. Note: you can use `$git clone <path to git file on github> ` in this folder to deploy a project. Here we will be deploying directly from your working directory on your computer.

`$ pwd`

`$ sudo npm install --save-dev gulp-sftp`

```js
var sftp = require('gulp-sftp');

gulp.task('deploy', function() {
  return gulp.src('./app/**/*')
  .pipe(sftp({
    host: 'oit2.scps.nyu.edu',
    user: '****',
    pass: '****',
    remotePath: '/home/p/<user>/web'
  }));
});
```

##NODE

A simple node.js [server](https://nodejs.org/en/about/).

##Express

Let's look at the canonical "Hello world" [example](https://expressjs.com/en/starter/hello-world.html). 

Here is the [generator](https://expressjs.com/en/starter/generator.html). Note the directory structure and the use of Jade as a template tool.

We will be using HTML [static](https://expressjs.com/en/starter/static-files.html) files in our exercise.

Examine the `package.json` and `app.js` files in `scripting` - a generic Express app pointing to our public folder for static assets.

Note that the js file is now separate and linked at the bottom of our index page.

###Setup

Close all tabs in Sublime relating to sushi and `cd` into scripting. Before we begin editing let's implement our workflow.

Add gulp, gulp-sass, gulp-sourcemaps and browser-sync to the list of devDependencies:

```js
{
  "name": "pictureviewer",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "author": "Daniel Deverell",
  "license": "MIT",
  "dependencies": {
    "express": "^4.14.0"
  },
  "devDependencies": {
    "browser-sync": "^2.16.0",
    "gulp": "^3.9.1",
    "gulp-sass": "^2.3.2",
    "gulp-sourcemaps": "^1.6.0"
  }
}

```

Since gulp is just JavaScript we can forgo the use of a gulpfile and continue to use our app.js file for both gulp and express. Note the use of [proxy and a specific browser](https://www.browsersync.io/docs/options/#option-browser) for browser sync:

```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync')
var express = require('express');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var sassSources = './app/public/sass/**/*.scss';
var sassOutput = './app/public/css';
var htmlSource = './app/public/**/*.html';

var app = express();
var port = process.env.PORT || 3000;

gulp.task('sass', function(){
  return gulp.src(sassSources)
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(sassOutput))
  .pipe(browserSync.stream())
});

function listening () {
  browserSync({
    proxy: 'localhost:' + port,
    browser: "google chrome"
  });
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSource).on('change', browserSync.reload);
}


app.use(express.static('./app/public'));

app.listen(port, listening);
```

Note: by editing the package.json file directly  we do not need to run `$ sudo npm install --save-dev <library>` for each of the packages. 

Run `$ node app.js` and test to ensure that any html changes refresh the browser. WE have not yet created our SASS directory so this will need to be done in accordance with the sassSources variable in app.js. 

We are not watching the js directory yet so we still have to do some manual refreshing.

###Adjust Formatting

Since we are working mobile first let's set up the display in a narrow browser.

```css
@import url(https://fonts.googleapis.com/css?family=Roboto:400,700);

body {
  font-size: 100%;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.active img {
  border-color: #666;
}

img {
  width: 100%;
  border: 4px solid #bbb;
}
```
Use [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for the image gallery

```css
#imageGallery {
  list-style: none;
  display: flex;
}

#imageGallery li {
  flex: 1 1 auto;
}
```
Position the caption so that it overlays the main image:

```css
#content {
  position: relative;
}
#content img {
  border: none;
}
#content p {
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  bottom: 0.5rem;
  color: white;
  padding: 1rem;
  width: 100%;
}
```

##DOM Scripting 

Let's refactor our js to use `classList`:

```js
...
links[0].parentNode.classList.add('active');
...
links[i].parentNode.classList.remove('active');
...
whichPic.parentNode.classList.add('active');
```

This is a new feature in HTML5 and an example of how advances in js are making jQuery [less and less relevant for web designers](https://medium.freecodecamp.com/how-to-manipulate-classes-using-the-classlist-api-f876e2f58236#.bmo0nynrj).

Add an Object to our js file:

```js
var myObject = {
  "entries":[
{
  "title": "Yellow pagoda by a river.",
  "name": "Yellow Pagoda",
  "picture": ["pagoda.jpg"]
},
{
  "title": "Red bridge over the river.",
  "name": "Red Bridge",
  "picture": ["bridge.jpg"]
},
{
  "title": "Green bamboo is the material.",
  "name": "Green Bamboo",
  "picture": ["bamboo.jpg"]
},
{
  "title": "Red stairway to the temple.",
  "name": "Red Stairway",
  "picture": ["stairway.jpg"]
}
]
};
```

We will use this object to look at the connection between data (the "model") and the html (the "view").

In the browser's console 
* `typeof myObject`
* `myObject`
* `myObject.entries`
* `myObject.entries.length`
* `myObject.entries[0]`
* `myObject.entries[0].picture`
* `myObject.entries[0].picture[0]`

To use this object let's add a new function - `addContent()`:

```js
window.onload = function(){
  addContent();
  prepareGallery();
};
```

Populate the html using data from the object:

```js
function addContent(){
    var gallery = document.getElementById("imageGallery");
    var links = gallery.getElementsByTagName("a");
    for ( var i=0; i < links.length; i++ ) {
        links[i].setAttribute('title', myObject.entries[i].title);
        links[i].setAttribute('href', 'img/' + myObject.entries[i].picture[0]);
        links[i].firstChild.nodeValue = myObject.entries[i].name;
  }
};
```
Now the titles are back in, the image src and the title are being populated from the object (try `"picture": ["pagoda-tn.jpg"]` to test).

Add a new node to the end of the html file:

```html
<div id="test"></div>
```

Comment out the addContent() function and let's see how a html block for a new navigation list might be dynamically created:

```js
function addContent(){
    var newgallery = document.createElement('h2')
    var newContent = document.createTextNode("Dynamic Gallery")
    newgallery.appendChild(newContent)
    var currentLoc = document.getElementById('test')
    document.body.insertBefore(newgallery, currentLoc)
    var newList = document.createElement('ul')
    document.body.appendChild(newList)
    for (var i=0; i < myObject.entries.length; i++){
        var li = document.createElement("li")
        var a = document.createElement("a")
        a.innerHTML = myObject.entries[i].name
        a.setAttribute('href', 'img/' + myObject.entries[i].picture[0])
        a.setAttribute('title', myObject.entries[i].title)
        li.appendChild(a)
        newList.appendChild(li)
    };
    document.body.insertBefore(newList, currentLoc); 
};

```

The amount of work required to develop the page dynamically is one of the reasons frameworks such as Angular have become popular.

##Angularizing our Gallery

Switch to `http://localhost:3001/alt.html` in the browser and examine the code.

* change the script link to point to `js/alt.js`

Examine alt.js.

* note the use of a function ListController and $scope

Add a link to angular js in alt.html.

* note the source directory `https://code.angularjs.org/1.2.3/`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Image Gallery</title>
<script src="https://code.angularjs.org/1.2.3/angular.js"></script>
<script src="js/alt.js" charset="utf-8"></script>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body data-ng-app>
    <h1>Image Gallery</h1>
    <div data-ng-controller="ListController">
        <ul id="imageGallery">
            <li data-ng-repeat="entry in entries">
                <a href="img/{{entry.picture[0]}}" title="{{entry.title}}">{{ entry.name }}</a>
            </li>
        </ul>
    </div>
    <div id="content">
      <img id="placeholder" src="img/placeholder.gif" alt="Placeholder">
      <p id="description">Select an image.</p>
    </div>
</body>
</html>
```
HTML5 introduced [the `data-` attribute](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes). 

Angular uses this to extend html with directives (data-ng-app, data-ng-controller, data-ng-repeat)

* `ng-app` directive defines an AngularJS application, here it tells AngularJS that the `<body>` element is the "owner" of a (currently unnamed) AngularJS application

AngularJS expressions are written inside double braces: `{{ expression }}`, e.g. `<p>My first expression: {{ 5 + 5 }}</p>`. Here we are using them to 'bind' data.

The ng-app directive defines the application, the ng-controller directive defines the controller.


```html
<body data-ng-app="myApp">
```

```js
var app = angular.module('myApp', []);

function ListController( $scope ) {
  $scope.entries = [
  ...
```

The module is a 
* container for the different parts of an Angular application
* container for the application controllers
* controllers always belong to a module:

```js
var app = angular.module('myApp', []);

app.controller("ListController", function( $scope ) {
  $scope.entries = [
  {
```

The scope is the binding between the HTML (view) and the JavaScript (controller). When you make a controller in AngularJS, you pass the $scope object as an argument. When adding properties to the $scope object in the controller, the view (HTML) gets access to these properties.


Use the thumbnails:
```html
<a href="img/{{entry.picture[1]}}" title="{{entry.title}}"><img ng-src="img/{{ entry.picture[0] }}"></a>
```
```js
"picture": ["pagoda-tn.jpg","pagoda.jpg"]
...
"picture": ["bridge-tn.jpg","bridge.jpg"]
...
```



##Homework

1. add gulp-sftp to your homework package.json file, edit your gulpfile and publish your homework to a server. Note: a final rendering of this ongoing project will consistute your midterm project and must be available both as a website on a server for viewing and a github repo. The midterm projects are due on the seventh class and must be an up to date showcase of the techniques discussed in class up to that point.


##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 3. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.

[Mozilla on DOM Scripting](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

NOTES

http://book.mixu.net/node/ch5.html

https://github.com/scotch-io/react-tweets/issues/22


