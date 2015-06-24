var classNames = require('classnames')
var React = require('react')

require('./LessonMenu.css')

var LessonMenu = React.createClass({
  handleSelectLesson(index) {
    this.props.selectLesson(index)
  },
  render() {
    var {lessons, currentLessonIndex} = this.props
    return <div className="LessonMenu">
      {lessons.map((lesson, index) => {
        var isActive = index === currentLessonIndex
        var linkClassName = classNames('LessonMenu__lesson', {
          'LessonMenu__lesson--active': isActive
        })
        return <a className={linkClassName}
                  onClick={!isActive && this.handleSelectLesson.bind(this, index)}
                  title={lesson.name}>
          <div>
            <span className="LessonMenu__number">{index + 1}</span>
          </div>
        </a>
      })}
    </div>
  }
})

module.exports = LessonMenu
