var CodeMirror = require('react-codemirror')
var marked = require('marked')
var React = require('react')

require('./LessonText.css')

var LessonText = React.createClass({
  render() {
    var {step} = this.props
    return <div className="LessonText">
      {this.props.editing
       ? <CodeMirror value={step.text} options={{mode: 'markdown', lineWrapping: true}} onChange={this.props.onTextChange}/>
       : <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(step.text)}}/>
      }
    </div>
  }
})

module.exports = LessonText