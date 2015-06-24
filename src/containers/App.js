var React = require('react')
var LessonsApp = require('./LessonsApp')
var {createRedux} = require('redux')
var {Provider} = require('redux/react')
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
    return <Provider redux={redux}>
      {() =>
        <LessonsApp/>
      }
    </Provider>
  }
})

module.exports = App
