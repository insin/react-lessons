var React = require('react')
var {bindActionCreators} = require('redux')
var {connect} = require('redux/react')

var LessonActions = require('../actions/LessonActions')
var Lessons = require('../components/Lessons')
var LessonsToolbar = require('../components/LessonsToolbar')
var parseJSONFile = require('../utils/parse-json-file')

require('./LessonsApp.css')

var LessonsApp = React.createClass({
  componentWillMount() {
    var {dispatch, params} = this.props
    dispatch(LessonActions.selectLesson(Number(params.lesson)))
    dispatch(LessonActions.selectStep(Number(params.step)))
  },

  componentWillReceiveProps(nextProps) {
    var {dispatch, params} = this.props
    var {params: nextParams} = nextProps
    if (params.lesson !== nextParams.lesson) {
      dispatch(LessonActions.selectLesson(Number(nextParams.lesson)))
    }
    if (params.step !== nextParams.step) {
      dispatch(LessonActions.selectStep(Number(nextParams.step)))
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
    parseJSONFile(e.dataTransfer.files[0], (err, lessonData) => {
      if (err) {
        window.alert(`Unable to import lessons: ${e.message}.`)
        return
      }
      this.props.dispatch(LessonActions.importLessons(lessonData))
    })
  },

  render() {
    var {lessons, dispatch} = this.props
    var actions = bindActionCreators(LessonActions, dispatch)
    var currentLesson = lessons.lessons[lessons.currentLessonIndex]
    var currentStep = currentLesson.steps[lessons.currentStepIndex]
    return <div className="LessonsApp" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
      <LessonsToolbar {...lessons} {...{currentLesson, currentStep}} actions={actions}/>
      <Lessons {...lessons} {...{currentLesson, currentStep}} actions={actions}/>
    </div>
  }
})

// We need to get a hold of the dispatch function in order to respond to URL
// param changes in LessonsApp#componentWillReceiveProps. Using the connect
// decorator will wrap LessonsApp with a higher-order component which passes
// lessons state and the dispatch function as props.
LessonsApp = connect((state) => state)(LessonsApp)

module.exports = LessonsApp
