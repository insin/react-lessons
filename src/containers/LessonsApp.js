var React = require('react')
var {bindActionCreators} = require('redux')
var {Connector} = require('redux/react')
var Lessons = require('../components/Lessons')
var LessonActions = require('../actions/LessonActions')
var exportJSON = require('../utils/export-json')
var instructionsLesson = require('../instructions-lesson')

require('./LessonsApp.css')

var LessonsApp = React.createClass({
  handleExportLesson(lesson) {
    exportJSON(lesson, `${lesson.name || 'react-lesson'}.json`)
  },
  handleExportLessons(lessons) {
    exportJSON(lessons, 'react-lessons.json')
  },
  handleViewInstructions(dispatch, lessons, currentLessonIndex) {
    // Check if the instructions are already being displayed as a lesson
    var instructionsIndex = -1
    for (var i = 0; i < lessons.length; i++) {
      if (lessons[i].instructions) {
        instructionsIndex = 1
        break
      }
    }

    // Only add the instructions lesson if it's not already there
    if (instructionsIndex === -1) {
      dispatch(LessonActions.importLessons(instructionsLesson))
      instructionsIndex = lessons.length
    }

    // Only select the instructions lesson if we're not already doing so, as it
    // will switch back to the first step if already selected.
    if (instructionsIndex !== currentLessonIndex) {
      dispatch(LessonActions.selectLesson(instructionsIndex))
    }
  },
  handleDragOver(e) {
    e.preventDefault()
  },
  handleDrop(importLessons, e) {
    e.preventDefault()

    if (!e.dataTransfer.files || !e.dataTransfer.files[0]) {
      return
    }

    var reader = new window.FileReader()
    reader.onload = (e) => {
      var json = e.target.result
      try {
        importLessons(JSON.parse(json))
      }
      catch (e) {
        window.alert('Unable to import lessons - invalid JSON?')
      }
    }
    reader.readAsText(e.dataTransfer.files[0])
  },

  render() {
    return <Connector>
      {({lessons, dispatch}) => {
        var actions = bindActionCreators(LessonActions, dispatch)
        var currentLesson = lessons.lessons[lessons.currentLessonIndex]
        var currentStep = currentLesson.steps[lessons.currentStepIndex]
        return <div className="App">
          <div className="App__admin"
               onDragOver={this.handleDragOver}
               onDrop={this.handleDrop.bind(this, actions.importLessons)}>
            <label>
              <input type="checkbox"
                     checked={lessons.editing}
                     onChange={(e) => actions.toggleEditing(e.target.checked)}/>
              {' '}
              Edit Mode
            </label>
            {' | Drop a lesson .json file here to import'}
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
              {' | '}
              <button type="button" onClick={this.handleExportLesson.bind(this, currentLesson)}>
                Export Lesson
              </button>
              {' | '}
              <button type="button" onClick={this.handleExportLessons.bind(this, lessons.lessons)}>
                Export All
              </button>
            </span>}
            {' | '}
            <button type="button"
                    onClick={this.handleViewInstructions.bind(
                      this, dispatch, lessons.lessons, lessons.currentLessonIndex
                    )}>
              View Instructions
            </button>
          </div>
          <Lessons {...lessons} {...{currentLesson, currentStep}} actions={actions}/>
        </div>
      }}
    </Connector>
  }
})

module.exports = LessonsApp
