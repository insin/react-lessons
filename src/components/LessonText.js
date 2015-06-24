var CodeMirror = require('react-codemirror')
var marked = require('marked')
var React = require('react')

require('./LessonText.css')

var LessonText = React.createClass({
  shouldComponentUpdate(nextProps) {
    return (this.props.step.text !== nextProps.step.text ||
            this.props.editing !== nextProps.editing ||
            this.props.stepNumber !== nextProps.stepNumber ||
            this.props.lessonNumber !== nextProps.lessonNumber)
  },
  handleChange(text) {
    if (text !== this.props.step.text) {
      this.props.updateStep({text})
    }
  },
  handleNext() {
    this.props.selectStep(this.props.currentStepIndex + 1)
  },
  render() {
    var {editing, step, stepNumber, lesson} = this.props
    var hasNext = stepNumber < lesson.steps.length
    return <div className="LessonText">
      {editing
       ? <CodeMirror
           onChange={this.handleChange}
           options={{mode: 'markdown', lineWrapping: true}}
           value={step.text}
         />
       : <div>
           <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(step.text)}}/>
           {hasNext && <div className="LessonText__next">
             <button type="button" onClick={this.handleNext}>Next &raquo;</button>
           </div>}
         </div>
      }
    </div>
  }
})

module.exports = LessonText
