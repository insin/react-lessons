require('../node_modules/github-markdown-css/github-markdown.css')
require('../node_modules/codemirror/lib/codemirror.css')

var CodeMirror = require('codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')
var React = require('react')
var App = require('./containers/App')

React.render(<App/>, document.getElementById('root'))
