var CodeMirror = require('react-codemirror')
var marked = require('marked')
var React = require('react')
var shouldComponentUpdate = require('react-pure-render/function')

require('./LessonText.css')

var LessonText = React.createClass({
  shouldComponentUpdate,
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
