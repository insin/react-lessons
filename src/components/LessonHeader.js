var classNames = require('classnames')
var React = require('react')

require('./LessonHeader.css')

var LessonHeader = React.createClass({
  render() {
    var {addStep, currentStepIndex, editing, lesson, lessonNumber, selectStep, updateLesson} = this.props
    return <div className="LessonHeader">
      <h2>
        {`${lessonNumber}. `}
        {editing
         ? <input value={lesson.name} onChange={e => updateLesson({name: e.target.value})}/>
         : lesson.name
        }
      </h2>
      <div className="LessonHeader__steps">
        {lesson.steps.map((step, index) => {
          var isActive = index === currentStepIndex
          var className = classNames('LessonHeader__step', {
            'LessonHeader__step--active': isActive
          })
          return <a className={className} onClick={!isActive && selectStep.bind(null, index)}>
            {index + 1}
          </a>
        })}
      </div>
      <div className="LessonHeader__buttons">
        <button type="button">Reset</button>
      </div>
    </div>
  }
})

module.exports = LessonHeader