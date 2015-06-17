var React = require('react')
var LessonsApp = require('./LessonsApp')

var {createRedux} = require('redux')
var {Provider} = require('redux/react')
var stores = require('../stores/index')

var redux = createRedux(stores, {
  lessons: {
    editing: false,
    lessons: [{
      name: 'Thinking In React',
      steps: [
        {text: '## Start with a mock', code: '', solution: ''}
      ]
    }],
    currentLessonIndex: 0,
    currentStepIndex: 0
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