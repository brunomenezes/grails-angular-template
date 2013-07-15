Grails Angular Template
=======================

_Grails Angular Template is born to simplify the use of templates on a grails application using angular structures._

##Dependencies
+ angularJS (We do not provide the base code.)
+ Jquery (To use the fancy query selector inside the service that we provide to you)

####But how it works ?
Maybe you heard about the *Resource.groovy class before, and all that awesome dependencies structure that it provides.This plugin works together with the layoutResources. I mean behind the stuffs you will use a taglib to bootstrap some stuffs. All you're need to do is put `<gat:bootstrap/>` on your main.gsp or whichever layout you want to use. Following a simple example of code structure inside a ApplicationResource.groovy
```groovy
modules={
	angular{
		resource url: "js/angular.js"
	}

	myAngularApp{
		dependsOn "angular"
		resource url: "js/myAngularApp.js"
	}
}
```
after that you can call on the head of you gsp

```
<head>
	<r:require module="myAngularApp"/>
</head>
```
_voilá the angular.js and myAngularApp.js is loaded on the page in the right order. awesome right ?_

Until I publish it on grails central plugin repository, we should do in the manual-way. clone the project inside the same diretory on your app is,
open the **BuildConfig.groovy** of you application and write this snippet of code like below.

```groovy
grails.plugin.location.grailsangulartemplate = "../grails-angular-template"
```
_After that the plugin is available to your app. Do you Remember the *Resources.groovy ? ok, open it. and just add grails angular template on dependsOn declaration like below_

```groovy
	//alot of code over 
	myAngularApp {
		dependsOn "angular, grails-angular-template"
		resource url:'js/myAngularApp.js'
	}
```

Like we know when you define a module on angularJS you can inject other modules, A smart way to reuse code. so here is the code inside myAngularApp.js
```javascript
var myAngularModule = angular.module('myApp', ['grails-angular-template']); 
// just that an all the code inside the grails-angular-template
// module is available to your module in that case 'myApp'

//let's define a controller  
function myController($scope, templateService){
	templateService.load('/user/template1').into('section.someSection').withData({some reasonable data here}).start()
	templateService.load('/user/template2').into('nav.someNav').start()	
}
``` 
_The magic is all in the template service, when you inject the grails-angular-template module inside your module, this service is provided. another nice thing is, you can concatenate the methods. The `load()` and `into()` is required, because what do you want load and where ? but the `withData()` is optional.One last thing the `start()` must be the last method to be called._

##Be Aware
**`withData()` waits for a Map. and that map has some special keys like 'scope' and 'broadcast'**
##What it Scope does ? 
_Imagine, you will just load a piece of html that hasn't has a ng-controller defined. But in this snipped of code you use the variables of a scope working, so you just need to pass that scope in the `withData({scope:$scope})` and the templateService will understand that they should use that scope to compile that snipped of template. Following a simple example_

_template1.gsp_
```HTML
<ul ng-repeat="user in users">
	<li>{{user.name}}</li>
</ul>
```
_myAngularApp.js_
```javascript
function myController($scope, templateService){
	var users = [{name:"bruno"}, {name:"fabio"}, {name:"max"}];
	templateService
		.load("/user/template1")
		.into("section.listOfUsers")
		.withData({scope:$scope}).start();
}
```
_We said to `templateService` loads the template1 inside a section with class listOfUsers. On the 'withData' I said to templateService to use the controller scope, with it they will iterate correctly inside the list of users that I had define early._

##What It Broadcast does ? 

_By default after complete all cycle on the template service, they will broadcast a event, with the same name informed on `load()`. The data passed through that event is the map passed on `withData()`. If you for some reason want to listen that event and do something that is the way. If you don't want to broadcast just do `withData({broadcast:false})`_

##Methods and Arguments
+ `load()` _@String  example : `'/user/templateName'`_
+ `into()` _@String  example : `tag.someClassName` or any **css selector**_
+ `withData()` _@Object exaple : `{key:value}` but with 2 special keys **scope** and **broadcast**._
+ `start()` _@None. Make the magic happens_