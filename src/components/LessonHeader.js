var classNames = require('classnames')
var React = require('react')
var {Link} = require('react-router')

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
    var {currentLessonIndex, currentStepIndex, editing, lesson, lessonCount, lessonNumber, step} = this.props
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
        {lesson.steps.map((step, index) =>
          <Link to={`/${currentLessonIndex}/${index}`}
                className="LessonHeader__step"
                activeClassName="LessonHeader__step--active">
            {index + 1}
          </Link>
        )}
      </div>
      {!editing && <div className="LessonHeader__buttons">
        <button type="button" onClick={this.handleReset}>Reset</button>
        <button type="button" onClick={this.handleFixCode} disabled={!step.solution}>Fix code</button>
      </div>}
    </div>
  }
})

module.exports = LessonHeader
