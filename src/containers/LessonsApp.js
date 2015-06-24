var React = require('react')
var {bindActionCreators} = require('redux')
var {Connector} = require('redux/react')
var Lessons = require('../components/Lessons')
var LessonActions = require('../actions/LessonActions')
var exportJSON = require('../utils/export-json')

require('./LessonsApp.css')

/*eslint-disable quotes */
var INSTRUCTIONS_LESSON = {
  "name": "React Lessons Instructions",
  "instructions": true,
  "steps": [
    {
      "text": "## React Lessons\n\nReact Lessons is a tool for creating - and taking - interactive [React](http://facebook.github.io/react/) tutorials.\n\nEach lesson can include one or more steps (numbered across the top-right of the page).\n\n### Lesson steps\n\nA lesson step consists of:\n\n* Text explaining the purpose of the step, providing learning material and\n  giving instructions for the piece of code that needs to be written using the\n  material introduced by the step.\n\n* An outline for code to be written to practice the step's material.\n\nClick the \"Next\" button below to proceed to the next step and try some coding.",
      "code": "",
      "solution": ""
    },
    {
      "text": "## Writing JavaScript code\n\nJavaScript code can be written in the panel on the right, and executed by pressing\nShift+Enter or pressing the Execute button underneath.\n\nThe following variables are available for use in code:\n\n* `React` - the React library.\n* `output` - the DOM node for the output area below.\n\nCode is transformed with [Babel](http://babeljs.io) before being executed, so you can use:\n\n* [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) - the XML-like syntax React uses to make generating content in JavaScript more pleasant.\n* [ECMAScript 6 features](http://babeljs.io/docs/learn-es2015/#ecmascript-6-features)\n* [ECMAScript 7 proposals](http://babeljs.io/docs/usage/experimental/) experimentally supported by Babel.\n\n### Coding time!\n\nLet's do some coding practice to get started.\n\nModify the code on the right so the output reads \"Hello world!\" instead of \"Hello…\"\n\nIf you're stumped, click the \"Fix code\" button just above the coding area to\nview and run the solution.",
      "code": "React.render(<h1>Hello&hellip;</h1>, output)",
      "solution": "React.render(<h1>Hello world!</h1>, output)"
    },
    {
      "text": "## Editing lessons\n\nToggle the \"Edit Mode\" checkbox on the top left to enter editing mode.\n\nIn editing mode, you can change the lesson name and edit the content of each step.\n\n### Step text\n\nStep text is written in [Markdown](http://daringfireball.net/projects/markdown/basics).\n\n### Step code & solution\n\nIn editing mode, \"Code\" and \"Solution\" tabs will appear in the coding area:\n\n* Code is what the user will see when they first open the step.\n* Solution (if provided) will allow use of the \"Fix code\" button to see a solution for the coding challenge.",
      "code": "",
      "solution": ""
    },
    {
      "text": "## Creating and deleting lessons and steps\n\nIn editing mode, extra toolbar buttons are also displayed to allow you to add new lessons and steps, or to delete the current lesson or step.\n\nWhen you add more lessons to a tutorial, a menu will pop up on the left side of the page to allow you to navigate between them.\n\nClick \"Add Lesson\" now to give it a go.",
      "code": "",
      "solution": ""
    },
    {
      "text": "## Exporting lessons\n\nWhen in editing mode, you can export the current lesson or the complete tutorial using the \"Export Lesson\" and \"Export All\" buttons above.\n\nThis will prompt you to download a `.json` file containing lesson definitions.\n\n## Importing lessons\n\nTo import a lesson or a set of lessons, drag it onto the toolbar above.\n\n**Warning:** if you import a set of lessons, they will replace everything you currently have - be careful with this when editing!",
      "code": "",
      "solution": ""
    }
  ]
}
/*eslint-enable quotes */

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
      dispatch(LessonActions.importLessons(INSTRUCTIONS_LESSON))
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
