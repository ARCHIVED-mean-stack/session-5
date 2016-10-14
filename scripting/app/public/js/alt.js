function ListController( $scope ) {

	$scope.entries = [
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

window.onload = function() {
	prepareGallery();
}

function prepareGallery() {
  var gallery = document.getElementById("imageGallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++ ) {
  	links[i].onclick = function() {
        showPic(this, links);
        return false;
    }
    links[0].parentNode.className = 'active';
    showPic(links[0]);
}
};

function showPic(whichPic, links){
    if(links){
        for ( var i=0; i < links.length; i++ ) {
            links[i].parentNode.className = '';
        }
    }
    whichPic.parentNode.className = 'active';
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);

    var text = whichPic.getAttribute("title");
    var description = document.getElementById("description");
    description.firstChild.nodeValue = text;
};