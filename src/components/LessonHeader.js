var classNames = require('classnames')
var React = require('react')

require('./LessonHeader.css')

var LessonHeader = React.createClass({
  render() {
    var {
      currentStepIndex, editing, lesson, lessonNumber,
      addStep, selectStep, updateLesson
    } = this.props
    return <div className="LessonHeader">
      <h2>
        <span className="LessonHeader__number">{lessonNumber}.</span>
        <span className="LessonHeader__name">
          {editing
           ? <input value={lesson.name} onChange={e => updateLesson({name: e.target.value})}/>
           : lesson.name
          }
        </span>
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
      {!editing && <div className="LessonHeader__buttons">
        <button type="button">Reset</button>
        <button type="button">Fix code</button>
      </div>}
    </div>
  }
})

module.exports = LessonHeader
