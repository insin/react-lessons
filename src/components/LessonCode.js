var CodeMirror = require('react-codemirror')
var React = require('react')

require('./LessonCode.css')

var LessonCode = React.createClass({
  handleChange(code) {
    if (code !== this.props.step.code) {
      this.props.updateStep({code})
    }
  },
  render() {
    return <div className="LessonCode">
      <CodeMirror
        onChange={this.handleChange}
        options={{lineNumbers: true, mode: 'javascript'}}
        value={this.props.step.code}
      />
    </div>
  }
})

module.exports = LessonCode
