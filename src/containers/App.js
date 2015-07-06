var React = require('react')
var {Redirect, Router, Route} = require('react-router')
var {createRedux} = require('redux')
var {Provider} = require('redux/react')

var LessonsApp = require('./LessonsApp')
var stores = require('../stores/index')

var redux = createRedux(stores)

var App = React.createClass({
  render() {
    var {history} = this.props
    return <Provider redux={redux}>
      {renderRoutes.bind(null, history)}
    </Provider>
  }
})

function renderRoutes(history) {
  return <Router history={history}>
    <Route path=":lesson/:step" component={LessonsApp}/>
    <Redirect from="/" to="/0/0" />
  </Router>
}

module.exports = App
