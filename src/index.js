require('github-markdown-css/github-markdown.css')
require('codemirror/lib/codemirror.css')

require('codemirror')
require('codemirror/addon/mode/overlay')
require('codemirror/addon/mode/multiplex')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')
require('codemirror/mode/xml/xml')
require('codemirror/mode/gfm/gfm')
require('./utils/codemirror-jsx')

var React = require('react')
var App = require('./containers/App')

React.render(<App/>, document.getElementById('app'))
