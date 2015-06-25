var React = require('react')

var exportJSON = require('../utils/export-json')
var instructionsLesson = require('../instructions-lesson')

require('./LessonsToolbar.css')

var LessonsToolbar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleExportLesson(lesson) {
    exportJSON(lesson, `${lesson.name || 'react-lesson'}.json`)
  },

  handleExportLessons(lessons) {
    exportJSON(lessons, 'react-lessons.json')
  },

  handleViewInstructions() {
    var {actions, lessons, currentLessonIndex} = this.props

    // Check if the instructions are already being displayed as a lesson
    var instructionsIndex = -1
    for (var i = 0; i < lessons.length; i++) {
      if (lessons[i].instructions) {
        instructionsIndex = i
        break
      }
    }
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

  handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  },

  handleDrop(e) {
    e.preventDefault()

    if (!e.dataTransfer.files || !e.dataTransfer.files[0]) {
      return
    }

    var reader = new window.FileReader()
    reader.onload = (e) => {
      var json = e.target.result
      try {
        this.props.actions.importLessons(JSON.parse(json))
      }
      catch (e) {
        window.alert('Unable to import lessons - invalid JSON?')
      }
    }
    reader.readAsText(e.dataTransfer.files[0])
  },

  handleDeleteLesson() {
    var {currentLessonIndex, lessons} = this.props
    this.props.actions.deleteLesson()
    if (currentLessonIndex === lessons.length - 1) {
      this.context.router.replaceWith(`/${currentLessonIndex - 1}/0`)
    }
  },

  handleDeleteStep() {
    var {currentStepIndex, currentLesson, currentLessonIndex} = this.props
    this.props.actions.deleteStep()
    if (currentStepIndex === currentLesson.steps.length - 1) {
      this.context.router.replaceWith(`/${currentLessonIndex}/${currentStepIndex - 1}`)
    }
  },

  render() {
    var {actions, currentLesson, currentLessonIndex, dispatch, editing, lessons} = this.props
    return <div className="LessonsToolbar"
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop.bind(this, actions.importLessons)}>
      <label>
        <input type="checkbox"
               checked={editing}
               onChange={(e) => actions.toggleEditing(e.target.checked)}/>
        {' '}
        Edit Mode
      </label>
      {' | Drop a lesson .json file here to import'}
      {editing && <span>{' | '}
        <button type="button" onClick={actions.addLesson}>Add Lesson</button>{' '}
        {lessons.length > 1 && <button type="button" onClick={this.handleDeleteLesson}>
          Delete Lesson
        </button>}
        {' | '}
        <button type="button" onClick={actions.addStep}>Add Step</button>{' '}
        {currentLesson.steps.length > 1 && <span>{' | '}
          <button type="button" onClick={this.handleDeleteStep}>
            Delete Step
          </button>
        </span>}
        {' | '}
        <button type="button" onClick={this.handleExportLesson.bind(this, currentLesson)}>
          Export Lesson
        </button>
        {' | '}
        <button type="button" onClick={this.handleExportLessons.bind(this, lessons)}>
          Export All
        </button>
      </span>}
      {' | '}
      <button type="button" onClick={this.handleViewInstructions}>
        View Instructions
      </button>
    </div>
  }
})

module.exports = LessonsToolbar
