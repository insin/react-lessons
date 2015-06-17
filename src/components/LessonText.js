var CodeMirror = require('react-codemirror')
var marked = require('marked')
var React = require('react')

require('./LessonText.css')

var LessonText = React.createClass({
  render() {
    var {step} = this.props
    return <div className="LessonText">
      {this.props.editing
       ? <CodeMirror
            onChange={text => this.props.updateLesson({text})}
            options={{mode: 'markdown', lineWrapping: true}}
            value={step.text}
          />
       : <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(step.text)}}/>
      }
    </div>
  }
})

module.exports = LessonText