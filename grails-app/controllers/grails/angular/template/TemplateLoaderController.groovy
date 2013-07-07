package grails.angular.template

import grails.converters.JSON

class TemplateLoaderController {

    def loader() { 
    	render (template:params.templateName) as JSON
    }

    def index(){ }
}
