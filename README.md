#MEAN Session Five

##Angularizing our Gallery

`$cd` to scripting and run `$ sudo npm install`.

`$ node app.js`

Examine scripts.js and note the use of function ListController and $scope

Add a link to angular js:

```
<script src="https://code.angularjs.org/1.2.3/angular.js"></script>
```

* note the source directory - enter `https://code.angularjs.org/1.2.3/` in a browser.

HTML5 introduced [the `data-` attribute](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes). 

Angular uses this to extend html with directives (data-ng-app, data-ng-controller, data-ng-repeat)

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

* `ng-app` directive defines an AngularJS application, here it tells AngularJS that the `<body>` element is the "owner" of a (currently unnamed) AngularJS application

AngularJS expressions are written inside double braces: `{{ expression }}`, e.g. `<p>Simple expression: {{ 5 + 5 }}</p>`. Here we are using them to 'bind' data.

While the ng-app directive defines the application, the ng-controller directive defines the controller for that application.

Naming the app:

```html
<body data-ng-app="galleryApp">
```
Note that the app no longer works. We need to register the controller with the app:

```js
var app = angular.module('galleryApp', []);

function ListController( $scope ) {
  $scope.entries = [
  ...
```

The module is a 
* container for the different parts of an Angular application
* container for the application controllers
* controllers always belong to a module:

```js
var app = angular.module('galleryApp', []);

galleryApp.controller("ListController", function( $scope ) {
  ...
});
```

The scope is the binding between the HTML (view) and the JavaScript (controller). When you make a controller in AngularJS, you pass the $scope object as an argument. When adding properties to the $scope object in the controller, the view (HTML) gets access to these properties.

Now we can update to the last stable version of angular 1.x:
```
<script src="https://code.angularjs.org/1.5.8/angular.js"></script>
```

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
Use the directive `ng-src` to [prevent the error](https://docs.angularjs.org/api/ng/directive/ngSrc).

###More on Directives

Use a simple directive on the `<h1>`: `<h1>{{'Image' + ' ' + 'Gallery'}}</h1>` first

Add
```
<p><input ng-model="messageText" size="30" /> Everybody shout "{{ messageText | uppercase }}"</p>
```
Note the [filter](https://docs.angularjs.org/api/ng/filter). 

Try:
```
ng-init="portfolios = ['Call of Booty', 'The Sack of the Innocents', 'Pipe and First Mate']"
```

```
<ul>
  <li ng-repeat="portfolio in portfolios">  
    {{ portfolio }}
  </li>
</ul>
```

Expand on the init:
```
ng-init="portfolios = [ 
{ name: 'Call of Booty', date: '2013-09-01' },
{ name: 'The Sack of the Innocents', date: '2014-04-15' },
{ name: 'Pipe and First Mate', date: '2012-10-01' } ]"

<p>Filter list: <input ng-model="searchFor" size="30" /></p>

<ul>
    <li ng-repeat="portfolio in portfolios | filter:searchFor | orderBy:'date' ">
        {{ portfolio.name }}
    </li>
</ul>

<p> There are {{ portfolios.length }} portfolios available to view.</p>

```
Add [ngClass](https://docs.angularjs.org/api/ng/directive/ngClass) (see also [ngClassEven/Odd](https://docs.angularjs.org/api/ng/directive/ngClassEven)):

```
<li ng-repeat="portfolio in portfolios | filter:searchFor | orderBy:'date' " 
    ng-class="{ even: $even, odd: $odd }">
```
Key / Value pairs:
```
<ul>
    <li ng-repeat="portfolio in portfolios">
        <ul>
            <li ng-repeat="(key, value) in portfolio">
                <strong>{{key}}</strong> - {{value}}
            </li>
        </ul>
    </li>
</ul>
```
###Back to the Gallery

Add `$scope.galleryHeader = "Image Gallery";` to the controller
```
app.controller("HeaderController", function ($scope) {
    $scope.galleryHeader = "Image Galleries";
});
```
###Creating a Module

See `other/simple-module`

Save `app.module.js` into a newly created gallery folder and link it into the main html file:

```js
// Define the module
angular.module('galleryApp', []);
```

Save the existing scripts file into the gallery folder as `gallery-list.component.js`, edit the html to point to it and delete the js folder.

```
angular.module('galleryApp').component('imgList', {
    template:
    `<ul id="imageGallery">
        <li data-ng-repeat="entry in $ctrl.entries">
            <a href="img/{{ entry.picture[1] }}" title="{{ entry.title }}">
                <img src="img/{{ entry.picture[0] }}">
            </a>
        </li>
    </ul>
    <div id="content">
        <img id="placeholder" src="img/placeholder.gif" alt="Placeholder">
    <p id="description">Select an image.</p>`,

    // controller: function HeaderController() {
    //     this.galleryHeader = "Image Galleries";
    // },

    controller: function ListController() {
        this.entries = [
            {
                "title": "Yellow pagoda by a river.",
                "name": "Yellow Pagoda",
                "picture": ["pagoda-tn.jpg", "pagoda.jpg"]
            },
            {
                "title": "Red bridge over the river.",
                "name": "Red Bridge",
                "picture": ["bridge-tn.jpg", "bridge.jpg"]
            },
            {
                "title": "Green bamboo is the material.",
                "name": "Green Bamboo",
                "picture": ["bamboo-tn.jpg", "bamboo.jpg"]
            },
            {
                "title": "Red stairway to the temple.",
                "name": "Red Stairway",
                "picture": ["stairway-tn.jpg", "stairway.jpg"]
            }
        ]

        window.onload = function () {
            prepareGallery();
        }

        function prepareGallery() {
            var gallery = document.getElementById("imageGallery");
            var links = gallery.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                links[i].onclick = function () {
                    showPic(this, links);
                    return false;
                }
                links[0].parentNode.classList.add('active');
                showPic(links[0]);
            }
        };

        function showPic(whichPic, links) {
            if (links) {
                for (var i = 0; i < links.length; i++) {
                    links[i].parentNode.classList.remove('active');
                }
            }
            whichPic.parentNode.classList.add('active');
            var source = whichPic.getAttribute("href");
            var placeholder = document.getElementById('placeholder');
            placeholder.setAttribute('src', source);

            var text = whichPic.getAttribute("title");
            var description = document.getElementById("description");
            description.firstChild.nodeValue = text;
        };
    }
});
```

```
<div data-ng-app="galleryApp">
    <img-list></img-list>
</div>
```

##Sushi






##NODE





##Homework

1. add gulp-sftp to your homework package.json file, edit your gulpfile and publish your homework to a server. Note: a final rendering of this ongoing project will consistute your midterm project and must be available both as a website on a server for viewing and a github repo. The midterm projects are due on the seventh class and must be an up to date showcase of the techniques discussed in class up to that point.


##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 3. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.

[Mozilla on DOM Scripting](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

NOTES

http://book.mixu.net/node/ch5.html

https://github.com/scotch-io/react-tweets/issues/22


