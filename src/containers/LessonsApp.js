var React = require('react')
var {bindActionCreators} = require('redux')
var {connect} = require('react-redux')

var LessonActions = require('../actions')
var Lessons = require('../components/Lessons')
var LessonsToolbar = require('../components/LessonsToolbar')
var parseJSONFile = require('../utils/parse-json-file')

require('./LessonsApp.css')

var LessonsApp = connect(state => state)(React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
        window.alert(`Unable to import lessons: ${err.message}.`)
        return
      }
      var {dispatch, lessons} = this.props
      var {router} = this.context
      dispatch(LessonActions.importLessons(lessonData))
      if (Array.isArray(lessonData)) {
        router.replaceWith('/0/0')
      }
      else {
        router.transitionTo(`/${lessons.length}/0`)
      }
    })
  },

  render() {
    var {dispatch, ...props} = this.props
    var {currentLessonIndex, currentStepIndex, lessons} = props
    var actions = bindActionCreators(LessonActions, dispatch)
    var currentLesson = lessons[currentLessonIndex]
    var currentStep = currentLesson.steps[currentStepIndex]
    return <div className="LessonsApp" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
      <LessonsToolbar {...props} {...{currentLesson, currentStep}} actions={actions}/>
      <Lessons {...props} {...{currentLesson, currentStep}} actions={actions}/>
    </div>
  }
}))

module.exports = LessonsApp
