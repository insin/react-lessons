var React = require('react')

var instructionsLesson = require('../instructions-lesson')
var exportJSON = require('../utils/export-json')
var parseJSONFile = require('../utils/parse-json-file')

require('./LessonsToolbar.css')

function findInstructionsIndex(lessons) {
  var instructionsIndex = -1
  for (var i = 0; i < lessons.length; i++) {
    if (lessons[i].instructions) {
      instructionsIndex = i
      break
    }
  }
  return instructionsIndex
}

var LessonsToolbar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleExportLesson(lesson) {
    exportJSON(lesson, lesson.name ? `${lesson.name}.lesson.json` : 'lesson.json')
  },

  handleExportTutorial(lessons) {
    exportJSON(lessons, 'react-lessons.tutorial.json')
  },

  handleViewInstructions() {
    var {actions, lessons, currentLessonIndex} = this.props
    var instructionsIndex = findInstructionsIndex(lessons)

    // Only add the instructions lesson if it's not already there
    if (instructionsIndex === -1) {
      actions.importLessons(instructionsLesson)
      instructionsIndex = lessons.length
    }

    // Only select the instructions lesson if we're not already doing so, as it
    // will switch back to the first step if already selected.
    if (instructionsIndex !== currentLessonIndex) {
      this.context.router.transitionTo(`/${instructionsIndex}/0`)
    }
  },

  handleFileChange(e) {
    if (!e.target.files[0]) {
      return
    }
    parseJSONFile(e.target.files[0], (err, lessonData) => {
      if (err) {
        window.alert(`Unable to import lessons: ${err.message}.`)
        return
      }
      var {lessons} = this.props
      var {router} = this.context
      this.props.actions.importLessons(lessonData)
      if (Array.isArray(lessonData)) {
        router.replaceWith('/0/0')
      }
      else {
        router.transitionTo(`/${lessons.length}/0`)
      }
    })
  },

  handleAddLesson() {
    var {lessons} = this.props
    this.props.actions.addLesson()
    this.context.router.transitionTo(`/${lessons.length}/0`)
  },

  handleDeleteLesson() {
    var {currentLessonIndex, currentStepIndex, lessons} = this.props
    this.props.actions.deleteLesson()
    if (currentLessonIndex === lessons.length - 1) {
      this.context.router.replaceWith(`/${currentLessonIndex - 1}/0`)
    }
    else if (currentStepIndex > 0) {
      this.context.router.replaceWith(`/${currentLessonIndex}/0`)
    }
  },

  handleAddStep() {
    var {currentLesson, currentLessonIndex} = this.props
    this.props.actions.addStep()
    this.context.router.transitionTo(`/${currentLessonIndex}/${currentLesson.steps.length}`)
  },

  handleDeleteStep() {
    var {currentStepIndex, currentLesson, currentLessonIndex} = this.props
    this.props.actions.deleteStep()
    if (currentStepIndex === currentLesson.steps.length - 1) {
      this.context.router.replaceWith(`/${currentLessonIndex}/${currentStepIndex - 1}`)
    }
  },

  render() {
    var {actions, currentLesson, currentLessonIndex, editing, lessons} = this.props
    var instructionsIndex = findInstructionsIndex(lessons)
    var showViewInstructions = instructionsIndex === -1 || instructionsIndex !== currentLessonIndex
    return <div className="LessonsToolbar">
      <a style={{float: 'right'}} href="https://github.com/insin/react-lessons">Fork me on GitHub</a>
      <label>
        <input type="checkbox"
               checked={editing}
               onChange={(e) => actions.toggleEditing(e.target.checked)}/>
        {' '}
        Edit Mode
      </label>
      {' | '}
      <span className="LessonsToolbar__file">
        <button type="button">Import Lesson(s)</button>
        <input type="file" onChange={this.handleFileChange} accept=".json"/>
      </span>
      {' | '}
      <button type="button" onClick={this.handleExportLesson.bind(this, currentLesson)}>
        Export Lesson
      </button>
      {' | '}
      <button type="button" onClick={this.handleExportTutorial.bind(this, lessons)}>
        Export Tutorial
      </button>
      {editing && <span>{' | '}
        <button type="button" onClick={this.handleAddLesson}>Add Lesson</button>{' | '}
        {lessons.length > 1 && <button type="button" onClick={this.handleDeleteLesson}>
          Delete Lesson
        </button>}
        {' | '}
        <button type="button" onClick={this.handleAddStep}>Add Step</button>{' '}
        {currentLesson.steps.length > 1 && <span>{' | '}
          <button type="button" onClick={this.handleDeleteStep}>
            Delete Step
          </button>
        </span>}
      </span>}
      {showViewInstructions && <span>{' | '}
        <button type="button" onClick={this.handleViewInstructions}>
          View Instructions
        </button>
      </span>}
    </div>
  }
})

module.exports = LessonsToolbar
