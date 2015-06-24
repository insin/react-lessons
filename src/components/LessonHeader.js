var classNames = require('classnames')
var React = require('react')

require('./LessonHeader.css')

var LessonHeader = React.createClass({
  handleChange(e) {
    this.props.updateLesson({name: e.target.value})
  },
  handleFixCode() {
    this.props.updateCode(this.props.step.solution)
    this.props.executeCode(this.props.step.solution)
  },
  handleReset() {
    this.props.updateCode(this.props.step.code)
  },
  handleSelectStep(index) {
    this.props.selectStep(index)
  },
  render() {
    var {currentStepIndex, editing, lesson, lessonCount, lessonNumber, step} = this.props
    return <div className="LessonHeader">
      <h2>
        {lessonCount > 1 && <span className="LessonHeader__number">{lessonNumber}.</span>}
        <span className="LessonHeader__name">
          {editing
           ? <input value={lesson.name} onChange={this.handleChange}/>
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
          return <a className={className} onClick={!isActive && this.handleSelectStep.bind(this, index)}>
            {index + 1}
          </a>
        })}
      </div>
      {!editing && <div className="LessonHeader__buttons">
        <button type="button" onClick={this.handleReset}>Reset</button>
        <button type="button" onClick={this.handleFixCode} disabled={!step.solution}>Fix code</button>
      </div>}
    </div>
  }
})

module.exports = LessonHeader
