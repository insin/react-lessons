require('github-markdown-css/github-markdown.css')
require('codemirror/lib/codemirror.css')

require('codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')

var React = require('react')
var HashHistory = require('react-router/lib/HashHistory')
var App = require('./containers/App')

var history = new HashHistory()

React.render(<App history={history}/>, document.getElementById('root'))
