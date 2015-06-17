var React = require('react')

require('./LessonMenu.css')

var LessonMenu = React.createClass({
  render() {
    var {lessons, currentLessonIndex} = this.props
    return <div className="LessonMenu">
      {lessons.map((lesson, index) => <a className={index === currentLessonIndex && 'active'}>
        <div><span className="number">{index + 1}</span></div>
      </a>)}
    </div>
  }
})

module.exports = LessonMenu