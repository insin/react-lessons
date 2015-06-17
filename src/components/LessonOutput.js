var React = require('react')
var babel = require('babel-core/browser')

require('./LessonOutput.css')

var LessonOutput = React.createClass({
  componentDidMount() {
    this.executeCode()
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.code !== this.props.code) {
      this.executeCode(nextProps)
    }
  },
  executeCode(props) {
    props = props || this.props
    var code = babel.transform(props.code).code
    var func = new Function('React', 'output', code)
    func.call(this, React, React.findDOMNode(this.refs.output))
  },
  render() {
    return <div className="LessonOutput">
      <div ref="output"/>
    </div>
  }
})

module.exports = LessonOutput