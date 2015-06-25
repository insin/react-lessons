var CodeMirror = require('react-codemirror')
var marked = require('marked')
var React = require('react')
var {Link} = require('react-router')

require('./LessonText.css')

var LessonText = React.createClass({
  // Since this component is being rendered into a portal and needs to use React
  // Router's <Link> component, we need to manually recreate the context it
  // requires using the router instance which is being passed in as a prop.
  childContextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getChildContext() {
    return {
      router: this.props.router
    }
  },
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
  render() {
    var {currentLessonIndex, currentStepIndex, editing, step, stepNumber, lesson} = this.props
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
             <Link to={`/${currentLessonIndex}/${currentStepIndex + 1}`}>
               next &raquo;
             </Link>
           </div>}
         </div>
      }
    </div>
  }
})

module.exports = LessonText
