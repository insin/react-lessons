var CodeMirror = require('react-codemirror')
var React = require('react')

require('./LessonCode.css')

var LessonCode = React.createClass({
  render() {
    return <div className="LessonCode">
      <CodeMirror
        onChange={code => this.props.updateStep({code})}
        options={{lineNumbers: true, mode: 'javascript'}}
        value={this.props.step.code}
      />
    </div>
  }
})

module.exports = LessonCode