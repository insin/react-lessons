var CodeMirror = require('react-codemirror')
var marked = require('marked')
var React = require('react')

require('./LessonText.css')

var LessonText = React.createClass({
  shouldComponentUpdate(nextProps) {
    return (this.props.text !== nextProps.text ||
            this.props.editing !== nextProps.editing)
  },
  render() {
    var {editing, text, updateStep} = this.props
    return <div className="LessonText">
      {editing
       ? <CodeMirror
           onChange={text => updateStep({text})}
           options={{mode: 'markdown', lineWrapping: true}}
           value={text}
         />
       : <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(text)}}/>
      }
    </div>
  }
})

module.exports = LessonText
