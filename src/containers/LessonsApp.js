var Base64 = require('base-64')
var React = require('react')
var {bindActionCreators} = require('redux')
var {Connector} = require('redux/react')
var Lessons = require('../components/Lessons')
var LessonActions = require('../actions/LessonActions')

require('./LessonsApp.css')

var LessonsApp = React.createClass({
  exportLessons(lessons) {
    var filename = 'react-lessons.json'
    var json = JSON.stringify(lessons, null, 2)
    var json64 = Base64.encode(json)
    var a = document.createElement('a')
    if ('download' in a) {
      a.href = `data:text/json;base64,${json64}`
      a.download = filename
      var event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                           false, false, false, false, 0, null)
      a.dispatchEvent(event)
    }
    else if (typeof navigator.msSaveBlob == 'function') {
      navigator.msSaveBlob(new window.Blob([json], {
        type: 'text/json;charset=utf-8;'
      }), filename)
    }
    else {
      window.location.href = `data:application/octet-stream;base64,${json64}`
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
              Edit Lessons
            </label>{' | '}
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
            </span>}
            <button type="button" onClick={this.exportLessons.bind(this, lessons.lessons)}>
              Export
            </button>
            {' | Drop a lesson .json file here to import'}
          </div>
          <Lessons {...lessons} {...{currentLesson, currentStep}} actions={actions}/>
        </div>
      }}
    </Connector>
  }
})

module.exports = LessonsApp
