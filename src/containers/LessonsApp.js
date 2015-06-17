var React = require('react')
var {bindActionCreators} = require('redux')
var {Connector} = require('redux/react')
var Lessons = require('../components/Lessons')
var LessonActions = require('../actions/LessonActions')

require('./LessonsApp.css')

var LessonsApp = React.createClass({
  render() {
    return <Connector>
      {({lessons, dispatch}) => {
        var actions = bindActionCreators(LessonActions, dispatch)
        var currentLesson = lessons.lessons[lessons.currentLessonIndex]
        var currentStep = currentLesson.steps[lessons.currentStepIndex]
        return <div className="App">
          <div className="App__admin">
            <label>
              <input type="checkbox"
                     checked={lessons.editing}
                     onChange={(e) => actions.toggleEditing(e.target.checked)}/>
              {' '}
              Edit Lessons
            </label>{' '}
            {lessons.editing && <span>{' | '}
              <button type="button" onClick={actions.addLesson}>Add Lesson</button>{' '}
              {lessons.lessons.length > 1 && <button type="button" onClick={actions.deleteLesson}>
                Delete Lesson
              </button>}
              {' | '}
              <button type="button" onClick={actions.addStep}>Add Step</button>{' '}
              {currentLesson.steps.length > 1 && <button type="button" onClick={actions.deleteStep}>
                Delete Step
              </button>}
            </span>}
          </div>
          <Lessons {...lessons} {...{currentLesson, currentStep}} actions={actions}/>
        </div>
      }}
    </Connector>
  }
})

module.exports = LessonsApp
