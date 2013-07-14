class GrailsAngularTemplateGrailsPlugin {
    def version = "0.1"
    def grailsVersion = "2.1 > *"
    def dependsOn = [resources:"1.2"]
    def pluginExcludes = [
        "grails-app/views/error.gsp"
    ]
    def license = "APACHE"
    def title = "Grails Angular Template Plugin"
    def author = "Bruno Menezes"
    def authorEmail = "brunodmenezes@icloud.com"
    def description = '''\
        The best way to load gsp\'s templates with angular build-in structures, using the steady grails mechanism of template load.
'''
    // URL to the plugin's documentation
    def organization = [ name: "KDW-Tecnologia Informática LTDA", url:'']
    def developers = [ [ name: "Fábio Oshiro", email: "fabio.oshiro@gmail.com" ]]
    def documentation = "https://github.com/brunomenezes/grails-angular-template"
    def issueManagement = [ system: "GitHub", url: "https://github.com/brunomenezes/grails-angular-template/issues" ]

    // Online location of the plugin's browseable source code.
//    def scm = [ url: "http://svn.codehaus.org/grails-plugins/" ]

    def doWithWebDescriptor = { xml ->
        // TODO Implement additions to web.xml (optional), this event occurs before
    }

    def doWithSpring = {
        // TODO Implement runtime spring config (optional)
    }

    def doWithDynamicMethods = { ctx ->
        // TODO Implement registering dynamic methods to classes (optional)
    }

    def doWithApplicationContext = { applicationContext ->
        // TODO Implement post initialization spring config (optional)
    }

    def onChange = { event ->
        // TODO Implement code that is executed when any artefact that this plugin is
        // watching is modified and reloaded. The event contains: event.source,
        // event.application, event.manager, event.ctx, and event.plugin.
    }

    def onConfigChange = { event ->
        // TODO Implement code that is executed when the project configuration changes.
        // The event is the same as for 'onChange'.
    }

    def onShutdown = { event ->
        // TODO Implement code that is executed when the application shuts down (optional)
    }
}
