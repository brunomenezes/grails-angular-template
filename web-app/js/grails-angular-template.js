var module = angular.module('TemplateLoader', []);
	module.factory('templateService', ['$http', '$rootScope', '$compile', 
		function($http, $rootScope, $compile){
			var url = config.contextPath + "/trader/templateLoader?templateName="; 
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
						var templateZone = angular.element(_selector);
					  	var scope = _data.scope? _data.scope : $rootScope.$new();
				    	var compiledTemplate = $compile(htmlPiece)(scope);
				    	templateZone.html(compiledTemplate);
					    $rootScope.$broadcast(_resourceLocation, _data);
					});
				}
			}
			return templateService;
		}
	]);