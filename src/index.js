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
var {applyMiddleware, createStore} = require('redux')
var {Provider} = require('react-redux')
var thunkMiddleware = require('redux-thunk')
var {Redirect, Router, Route} = require('react-router')
var {history} = require('react-router/lib/HashHistory')

var LessonsApp = require('./containers/LessonsApp')
var reducer = require('./reducer')

var renderRoutes = () =>
  <Router history={history}>
    <Route path=":lesson/:step" component={LessonsApp}/>
    <Redirect from="/" to="/0/0" />
  </Router>

var store = applyMiddleware(thunkMiddleware)(createStore)(reducer)

React.render(
  <Provider store={store}>{renderRoutes}</Provider>,
  document.getElementById('app')
)

