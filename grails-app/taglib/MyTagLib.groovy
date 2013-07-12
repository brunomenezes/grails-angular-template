
class MyTagLib {

	def simple = { attrs, body ->
		out << body()
		 out << r.script(disposition:'head') {
            out << 'console.log("hello world");'
        }
	}
}