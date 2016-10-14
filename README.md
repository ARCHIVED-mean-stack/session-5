#MEAN Session Five

`$cd` to sushi and run `$ sudo npm install`.

Use the default gulp task to run the page in the browser (re-examine the gulpfile). 

##Sushi 




##NODE


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


