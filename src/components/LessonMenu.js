var classNames = require('classnames')
var React = require('react')
var {Link} = require('react-router')

require('./LessonMenu.css')

var LessonMenu = React.createClass({
  handleSelectLesson(index) {
    this.props.selectLesson(index)
  },
  render() {
    var {lessons, currentLessonIndex} = this.props
    return <div className="LessonMenu">
      {lessons.map((lesson, index) =>
        <Link to={`/${index}/0`}
              className={classNames('LessonMenu__lesson', {
                'LessonMenu__lesson--active': index === currentLessonIndex
              })}>
          <div>
            <span className="LessonMenu__number">{index + 1}</span>
          </div>
        </Link>
      )}
    </div>
  }
})

module.exports = LessonMenu
