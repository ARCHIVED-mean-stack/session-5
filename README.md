#MEAN Session Five

##Angularizing our Gallery

`$cd` to scripting and run `$ sudo npm install`.

`$ node app.js`

Examine scripts.js and note the use of function ListController and $scope. 

Ensure that Gulp is processing the scss files.

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
<script src="js/scripts.js"></script>
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

Declaring the app:

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

app.controller("ListController", function( $scope ) {
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
<a href="img/{{entry.picture[1]}}" title="{{entry.title}}">
    <img src="img/{{ entry.picture[0] }}">
</a>
```
```js
"picture": ["pagoda-tn.jpg","pagoda.jpg"]
"picture": ["bridge-tn.jpg","bridge.jpg"]
...
```
Use the directive `ng-src` to [prevent the error](https://docs.angularjs.org/api/ng/directive/ngSrc).



###Directives and Filters

Use a simple directive on the `<h1>`: `<h1>{{'Image' + ' ' + 'Gallery'}}</h1>` first

Add
```
<p>
    <input ng-model="messageText" size="30" /> 
    Everybody shout "{{ messageText | uppercase }}"
</p>
```
Note the [filter](https://docs.angularjs.org/api/ng/filter).

```
<ul>
  <li ng-repeat="entry in entries">  
    {{ entry.title }}
  </li>
</ul>
```

Expand on the init:
```
<p>Filter list: <input ng-model="searchFor" size="30" /></p>

<ul>
    <li ng-repeat="entry in entries | filter:searchFor | orderBy:'title' ">
        {{ entry.title }}
    </li>
</ul>

<p> There are {{ entries.length }} entries available to view.</p>

```
Add [ngClass](https://docs.angularjs.org/api/ng/directive/ngClass) (see also [ngClassEven/Odd](https://docs.angularjs.org/api/ng/directive/ngClassEven)):

```
<li ng-repeat="portfolio in portfolios | filter:searchFor | orderBy:'date' " 
    ng-class="{ even: $even, odd: $odd }">
```
Key / Value pairs:
```
<ul>
    <li ng-repeat="entry in entries">
        <ul>
            <li ng-repeat="(key, value) in entry">
                <strong>{{key}}</strong> - {{value}}
            </li>
        </ul>
    </li>
</ul>
```


###Creating a Module

See `other/simple-module`

Save `app.module.js` into a newly created public/gallery folder and link it into the main html file:

```js
// Define the module
angular.module('galleryApp', []);
```

Save the existing scripts file into the gallery folder as `gallery-list.component.js`, edit the html to point to it and (optionally) delete the js folder.

In the component js file:

```js
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
In index.html:

```html
<div data-ng-app="galleryApp">
    <img-list></img-list>
</div>
```

##Sushi

Note the addition of a new home page - `index.html` and the addition of images to the `img` directory.

* Download [Visual Studio Code](http://code.visualstudio.com)
* Edit the user preferences to `"editor.formatOnType": true,` and `"editor.formatOnSave": true`
* Note the built-in support for Angular and Git

Create a Git and Github repo for this project so we can use the built-in support in Code.

Run `sudo npm install`, run `gulp` and test by adding a selected state for the new home page to the sass (the class name for the page is `p-home`).

Add `<script src="https://code.angularjs.org/1.5.8/angular.js"></script>`. 

###Controllers

on `git branch module`

```html
<article ng-app="recipeApp" ng-controller="RecipeListController">
    <ul>
        <li ng-repeat="recipe in recipes">
            <span>{{recipe.title}}</span>
            <p>{{recipe.description}}</p>
        </li>
    </ul>
</article>
```

###Componentize

Remember - components take the template (html) and controller and unify them into a single item. They offer re-usability and allow the scope to be isolated thus avoiding potentially difficult bugs.

Git stash, git branch, git checkout (remove the references to the files above in index.html)

Create `app-module.js` in the app directory and link to it in `index.html`:

```
'use strict';

angular.module('recipeApp', []);
```

[Article on use strict](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)

This defines the `recipeApp` [module](https://docs.angularjs.org/guide/module).

Create `recipe-list.component.js` in the recipes directory and link it to index.html:
```
'use strict';

angular.module('recipeApp').component('recipeList', {
    template:
    `<h1>test</h1>`
});
```

And add the component to the page:
```html
<div ng-app="recipeApp">
    <recipe-list></recipe-list>
</div>
```

Add the controller to `recipe-list.component.js`:
```js
angular.module('recipeApp').component('recipeList', {
    template:
    `<h1>test</h1>`,
    controller: function RecipeListController() {

    }
});
```
Add the data to the controller:
```js
angular.module('recipeApp').component('recipeList', {
  template:
    `<h1>test</h1>`,
  controller: function RecipeListController() {
    this.recipes = [
        {
            name: 'recipe1309',
            title: 'Lasagna',
            date: '2013-09-01',
            description: 'Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.',
            image: 'lasagne.png'
        },
        {
            name: 'recipe1404',
            title: 'Pho-Chicken Noodle Soup',
            date: '2014-04-15',
            description: 'Pho (pronounced “fuh”) is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
            image: 'pho.png'
        },
        {
            name: 'recipe1210',
            title: 'Guacamole',
            date: '2012-10-01',
            description: 'Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor – with this authentic Mexican guacamole recipe, though, you will be an expert in no time.',
            image: 'guacamole.png'
        },
        {
            name: 'recipe1810',
            title: 'Hamburger',
            date: '2012-10-20',
            description: 'A Hamburger (or often called as burger) is a type of food in the form of a rounded bread sliced in half and its Center is filled with patty which is usually taken from the meat, then the vegetables be lettuce, tomatoes and onions.',
            image: 'hamburger.png'
        }
    ];
}
});

```

Create the template. Note the use of back-ticks.

```html
template:
`
<ul>
    <li ng-repeat="recipe in $ctrl.recipes">
        <img ng-src="img/home/{{ recipe.image }}">
        <h1><a href="#0">{{ recipe.title }}</a></h1>
        <p>{{ recipe.description }}</p>
    </li>
</ul>
`,
```
Make it an external file:
```js
templateUrl: 'recipes/recipe-template.html',
```
Note - this link it relative to index.html

###Styling the Recipes

* create a new `_recipes.scss` file
* add it to the imports in `styles.scss
* add a class to the ul `<ul class="recipes-list">`
```css
.p-home article {
    margin-left: 1rem;
}
.recipes-list {
    display: flex;
    flex-wrap: wrap;
    li {
        box-sizing: border-box;
        background: rgba(240,223,180,0.25);
        padding: 0.875rem;
        flex: 1 0 100%;
        margin-top: 0.875rem;
        margin-right: 0.875rem;
        @media (min-width: $break-one){
            flex: 1 0 calc(50% - 0.875rem);
        }
    }
    img {
        width: 30%;
        float: left;
        margin-right: 0.875rem;
        @media (min-width: $break-one){
            width: 50%;
        }
    }
}

a {
    color: $reddish;
}
```

###Breakout

```html
<script src="app-module.js"></script>
<script src="recipes/recipe-list.module.js"></script>
<script src="recipes/recipe-list.component.js"></script>
```

* app-module - adding recipeList as a requirement
```
'use strict';

angular.module('recipeApp', [
    'recipeList'
]);
```

* recipe-list.module - a new file that declares a module
```
'use strict';

angular.module('recipeList', []);
```

* recipe-list.component - unchanged
```
'use strict';
        
angular.module('recipeApp').component('recipeList', {
```

###Search / Sort Filter

```
<p>
  Search: <input ng-model="$ctrl.query" />
</p>
```

`<li ng-repeat="recipe in $ctrl.recipes | filter:$ctrl.query">`

```
<p>
  Sort by:
  <select ng-model="$ctrl.orderProp">
    <option value="title">Alphabetical</option>
    <option value="date">Newest</option>
  </select>
</p>
```

`<li ng-repeat="recipe in $ctrl.recipes | filter:$ctrl.query | orderBy:$ctrl.orderProp">`

Add to the controller in `recipe-list.component.js` after the recipes array:

`this.orderProp = 'date';`

###Fetching the Data

Use recipes.json in `recipe-list.component.js`. Since we are making the assignment of the recipes property in a callback function, where the this value is not defined, we also introduce a local variable called self that points back to the controller instance.

```
angular.module('recipeApp').component('recipeList', {
    templateUrl: 'recipes/recipe-template.html',

    controller: function RecipeListController($http) {
        var self = this;
        self.orderProp = 'date';

        $http.get('data/recipes.json').then(function (response) {
            self.recipes = response.data;
        });
    }
  });
  ```

  ###Preparing for Routing

  In the html template:

  `<h1><a href="#recipes/{{ recipe.name }} ">{{ recipe.title }}</a></h1>`

  Add ngRoute to index.html after the main angular load:

  `<script src="https://code.angularjs.org/1.5.8/angular-route.js"></script>`

  Add link to `app.config.js` (after app.module):

  `<script src="app.config.js"></script>`

  We need to add `ngRoute` as a dependency for our app-module.js:
  ```
    'use strict';

    angular.module('recipeApp', [
    'ngRoute',
    'recipeList'
]);
```

Create the app.config file in the app folder:
```js
angular.
    module('recipeApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.
                when('/', {
                    template: '<recipe-list></recipe-list>'
                }).
                otherwise('/recipes');
        }
    ]);
```

Edit index.html:
```html
<article ng-app="recipeApp">
    <div ng-view></div>
</article>
```

###Routing

Add ngRoute as a dependency to our application:
```
'use strict';

angular.module('recipeApp', [
    'ngRoute',
    'recipeDetail',
    'recipeList'
]);
```


```
angular.
    module('recipeApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.
                when('/', {
                    template: '<recipe-list></recipe-list>'
                }).
                when('/recipes/:recipeId', {
                    template: '<recipe-detail></recipe-detail>'
                }).
                otherwise('/recipes');
        }
    ]);
```

Alter the recipe-template to include the bang:
```
<h1><a href="#!recipes/{{ recipe.name }} ">{{ recipe.title }}</a></h1>
```

```
Create stubs for recipe details in a new recipe-detail directory:

recipe-detail.module.js
```
angular.module('recipeDetail', [
    'ngRoute'
]);
```

recipe-detail.component.js
```
angular.
    module('recipeDetail').
    component('recipeDetail', {
        template: '<p>Detail view for <span>{{$ctrl.recipeId}}</span></p>',
        controller: ['$routeParams',
            function RecipeDetailController($routeParams) {
                this.recipeId = $routeParams.recipeId;
            }
        ]
    });
```

Link to recipe-detail files:

```
<head>
    <meta charset="UTF-8">
    <title>Brooklyn Eats: Matsu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.angularjs.org/1.5.8/angular.js"></script>
    <script src="https://code.angularjs.org/1.5.8/angular-route.js"></script>
    <script src="app-module.js"></script>
    <script src="app.config.js"></script>
    <script src="recipes/recipe-list.module.js"></script>
    <script src="recipes/recipe-list.component.js"></script>
    <script src="recipe-detail/recipe-detail.module.js"></script>
    <script src="recipe-detail/recipe-detail.component.js"></script>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
</head>





##Homework

1. Add a home page with an Angular module to the previous week's homework.


##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 4. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.

Attempt the Angular [PhoneCat](https://docs.angularjs.org/tutorial/) tutorial up to part 9. Note - you may need to install [Bower](https://bower.io) in order for it to work. I had to, and also has to use `sudo bower install --allow-root` in order to permit it to install dependencies.



NOTES




