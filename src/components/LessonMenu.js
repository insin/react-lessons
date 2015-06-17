var classNames = require('classnames')
var React = require('react')

require('./LessonMenu.css')

var LessonMenu = React.createClass({
  render() {
    var {lessons, currentLessonIndex} = this.props
    return <div className="LessonMenu">
      {lessons.map((lesson, index) => {
        var isActive = index === currentLessonIndex
        return <a className={classNames('LessonMenu__lesson', {
                    'LessonMenu__lesson--active': isActive
                  })}
                  onClick={!isActive && this.props.selectLesson.bind(null, index)}>
          <div>
            <span className="LessonMenu__number">{index + 1}</span>
          </div>
        </a>
      })}
    </div>
  }
})

module.exports = LessonMenu
