var classNames = require('classnames')
var React = require('react')

require('./LessonHeader.css')

var LessonHeader = React.createClass({
  render() {
    return <div className="LessonHeader">
      <h2>{`${this.props.lessonNumber}. ${this.props.lesson.name}`}</h2>
      <div className="LessonHeader__steps">
        {this.props.lesson.steps.map((step, index) => {
          var className = classNames('LessonHeader__step', {
            'LessonHeader__step--active': index === this.props.currentStepIndex
          })
          return <a className={className}>{index + 1}</a>
        })}
      </div>
      <div className="LessonHeader__buttons">
        <button type="button">Reset</button>
      </div>
    </div>
  }
})

module.exports = LessonHeader