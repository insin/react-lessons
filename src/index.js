require('github-markdown-css/github-markdown.css')
require('codemirror/lib/codemirror.css')

require('codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')

var React = require('react')
var App = require('./containers/App')

React.render(<App/>, document.getElementById('root'))
