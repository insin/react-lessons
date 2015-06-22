var React = require('react')
var babel = require('babel-core/browser')

require('./LessonOutput.css')

var LessonOutput = React.createClass({
  getInitialState() {
    return {
      errorMessage: ''
    }
  },
  componentDidMount() {
    this.executeCode()
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.code !== nextProps.code) {
      this.executeCode(nextProps)
    }
  },
  executeCode(props) {
    props = props || this.props
    var output = React.findDOMNode(this.refs.output)
    var errorMessage = ''
    try {
      var code = babel.transform(props.code).code
      /*eslint-disable no-new-func */
      var func = new Function('React', 'output', code)
      /*eslint-enable no-new-func */
      func.call(this, React, output)
    }
    catch (e) {
      errorMessage = e.message
      React.unmountComponentAtNode(output)
    }
    this.setState({errorMessage})
  },
  render() {
    return <div className="LessonOutput">
      {this.state.errorMessage && <div className="LessonOutput__error">
        {this.state.errorMessage}
      </div>}
      <div ref="output"/>
    </div>
  }
})

module.exports = LessonOutput
