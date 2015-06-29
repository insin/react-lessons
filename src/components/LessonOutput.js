var React = require('react')
var babel = require('babel-core/browser')

require('./LessonOutput.css')

var BABEL_OPTIONS = {stage: 0}

var LessonOutput = React.createClass({
  getInitialState() {
    return {
      errorMessage: ''
    }
  },
  componentDidMount() {
    if (this.props.executedCode) {
      this.executeCode(this.props.executedCode)
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.executedCode !== nextProps.executedCode) {
      this.executeCode(nextProps.executedCode)
    }
  },
  executeCode(code) {
    var output = React.findDOMNode(this.refs.output)
    if (!React.unmountComponentAtNode(output)) {
      output.innerHTML = ''
    }
    var errorMessage = ''
    if (code) {
      try {
        /*eslint-disable no-new-func */
        var func = new Function('React', 'output', babel.transform(code, BABEL_OPTIONS).code)
        /*eslint-enable no-new-func */
        func.call(this, React, output)
      }
      catch (e) {
        errorMessage = e.message
        React.unmountComponentAtNode(output)
      }
    }
    this.setState({errorMessage})
  },
  render() {
    return <div className="LessonOutput">
      {this.state.errorMessage && <div className="LessonOutput__error">
        {this.state.errorMessage}
      </div>}
      <div ref="output" className="markdown-body"/>
    </div>
  }
})

module.exports = LessonOutput
