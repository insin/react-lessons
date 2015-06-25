var React = require('react')
var {bindActionCreators} = require('redux')
var {connect} = require('redux/react')

var LessonActions = require('../actions/LessonActions')
var Lessons = require('../components/Lessons')
var LessonsToolbar = require('../components/LessonsToolbar')

require('./LessonsApp.css')

var LessonsApp = React.createClass({
  componentWillReceiveProps(nextProps) {
    if (this.props.params.lesson !== nextProps.params.lesson) {
      this.props.dispatch(LessonActions.selectLesson(Number(nextProps.params.lesson)))
    }
    if (this.props.params.step !== nextProps.params.step) {
      this.props.dispatch(LessonActions.selectStep(Number(nextProps.params.step)))
    }
  },

  render() {
    var {lessons, dispatch} = this.props
    var actions = bindActionCreators(LessonActions, dispatch)
    var currentLesson = lessons.lessons[lessons.currentLessonIndex]
    var currentStep = currentLesson.steps[lessons.currentStepIndex]
    return <div className="LessonsApp">
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
