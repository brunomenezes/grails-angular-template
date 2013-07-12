var module = angular.module('grails-angular-template', []);
	module.factory('templateService', ['$http', '$rootScope', '$compile', function($http, $rootScope, $compile){
			var url = config.contextPath + "/templateLoader/loader?templateName="; 
			var templateService = new function(){
				var self = this;
				var _resourceLocation, _selector, _data;
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
					$http.get(url + _resourceLocation).success(function(htmlPiece){
						//the default behaviour is to broadcast to the entire application what template loads, the event has the same name of the url
						//informed and the data informed is passed too. that way you can intercept and do whatever you want.
						_data.broadcast = _data.broadcast === false ? false : true;
						var templateZone = angular.element(_selector);
					  	var scope = _data.scope? _data.scope : $rootScope.$new();
				    	var compiledTemplate = $compile(htmlPiece)(scope);
				    	templateZone.html(compiledTemplate);
					   	if(_data.broadcast){
			    			$rootScope.$broadcast(_resourceLocation, _data);
			    		} else {
			    			console.log("avoiding the broadcast");
			    		}
					});
				}
			}
			return templateService;
		}
	]);