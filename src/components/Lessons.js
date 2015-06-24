var React = require('react')
var Lesson = require('./Lesson')
var LessonMenu = require('./LessonMenu')

require('./Lessons.css')

var Lessons = React.createClass({
  render() {
    var {lessons, currentLessonIndex, currentStepIndex, actions} = this.props
    var currentLesson = lessons[currentLessonIndex]
    var currentStep = currentLesson.steps[currentStepIndex]
    return <div className="Lessons">
      {lessons.length > 1 && <div className="Lessons__menu">
        <LessonMenu
          lessons={lessons}
          currentLessonIndex={currentLessonIndex}
          {...actions}
        />
      </div>}
      <Lesson
        {...this.props}
        {...actions}
        lesson={currentLesson}
        step={currentStep}
        lessonNumber={currentLessonIndex + 1}
        stepNumber={currentStepIndex + 1}
        lessonCount={lessons.length}
      />
    </div>
  }
})

module.exports = Lessons
