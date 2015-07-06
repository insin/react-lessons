var React = require('react')
var {Redirect, Router, Route} = require('react-router')
var {createRedux} = require('redux')
var {Provider} = require('redux/react')
var {history} = require('react-router/lib/HashHistory')

var LessonsApp = require('./LessonsApp')
var stores = require('../stores/index')

var redux = createRedux(stores)

var App = React.createClass({
  render() {
    return <Provider redux={redux}>
      {renderRoutes}
    </Provider>
  }
})

function renderRoutes() {
  return <Router history={history}>
    <Route path=":lesson/:step" component={LessonsApp}/>
    <Redirect from="/" to="/0/0" />
  </Router>
}

module.exports = App
