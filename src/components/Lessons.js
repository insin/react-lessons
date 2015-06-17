var React = require('react')
var Lesson = require('./Lesson')
var LessonMenu = require('./LessonMenu')

require('./Lessons.css')

var Lessons = React.createClass({
  render() {
    var {editing, lessons, currentLessonIndex, currentStepIndex, actions} = this.props
    var currentLesson = lessons[currentLessonIndex]
    var currentStep = currentLesson.steps[currentStepIndex]
    return <div className="Lessons">
      <div className="Lessons__menu">
        <LessonMenu lessons={lessons} currentLessonIndex={currentLessonIndex}/>
      </div>
      <Lesson
        lesson={currentLesson}
        step={currentStep}
        currentLessonIndex={currentLessonIndex}
        currentStepIndex={currentStepIndex}
        lessonNumber={currentLessonIndex + 1}
        stepNumber={currentStepIndex + 1}
        editing={editing}
        onCodeChange={actions.updateCode}
        onTextChange={actions.updateText}
      />
    </div>
  }
})

module.exports = Lessons