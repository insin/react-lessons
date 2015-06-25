var React = require('react')
var {Redirect, Router, Route} = require('react-router')
var {createRedux} = require('redux')
var {Provider} = require('redux/react')

var LessonsApp = require('./LessonsApp')
var stores = require('../stores/index')
var instructionsLesson = require('../instructions-lesson')

var redux = createRedux(stores, {
  lessons: {
    code: '',
    currentLessonIndex: 0,
    currentStepIndex: 0,
    editing: false,
    executedCode: '',
    lessons: [instructionsLesson]
  }
})

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
