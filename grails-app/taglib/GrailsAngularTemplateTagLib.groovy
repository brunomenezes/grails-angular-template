
class GrailsAngularTemplateTagLib {

	static namespace = "gat"

	def bootstrap = { attrs ->
		 def path = request.contextPath
		 out << r.script(disposition:'head') {
            out << 'var $gatContextPath = "'+path+'";'
        }
	}
}