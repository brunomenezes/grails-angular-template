var module = angular.module('grails-angular-template', []);
	module.factory('templateService', ['$http', '$rootScope', '$compile','cleanService', function($http, $rootScope, $compile, cleanService){
			var url = $gatContextPath + "/templateLoader/loader?templateName="; 
			var once = false;
			var templateService = new function(){
				var self = this;
				var _resourceLocation, _selector, _data = {};
				this.load = function(url){
					_resourceLocation = url;
					return self;
				}

				this.into = function(sel){
					_selector = sel;
					return self;
				}

				this.withData = function(data){
					_data = data;
					return self;	
				}

				this.start = function(){
					var request = {resourceLocation: _resourceLocation, selector: _selector, data: _data};
					$http.get(url + request.resourceLocation).success(function(htmlPiece){
						//the default behaviour is to broadcast to the entire application what template loads, the event has the same name of the url
						//informed and the data informed is passed too. that way you can intercept and do whatever you want.
						request.data.broadcast = request.data.broadcast === false ? false : true;
						var templateZone = angular.element(request.selector);
					  	var scope = request.data.scope? request.data.scope : $rootScope.$new();
					  	angular.extend(scope, request.data);
				    	var compiledTemplate = $compile(htmlPiece)(scope);
				    	cleanService.templateZoneCleaner(templateZone);
				    	templateZone.html(compiledTemplate);

					   	if(request.data.broadcast){
			    			$rootScope.$broadcast(request.resourceLocation, request.data);
			    		} else {
			    			console.log("avoiding the broadcast");
			    		}
					});
				}
			}

			return templateService;
		}
	]);

	module.factory('cleanService', [function(){
		return new function(){
			var _self = this;
			this.templateZoneCleaner = function(template){
				var scope = template.children().scope();
				scope ? scope.$destroy() : undefined;
			}
		}
	}]);