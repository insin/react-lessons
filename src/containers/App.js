var React = require('react')
var LessonsApp = require('./LessonsApp')

var {createRedux} = require('redux')
var {Provider} = require('redux/react')
var stores = require('../stores/index')

var DEFAULT_TEXT = `## Lesson text

Use Markdown for lesson text.

The following variables are available for use when writing code:

* \`React\`
* \`output\` - the DOM node for the output area below

JSX and all other ES6 and experimental ES7 features supported by Babel can be used in code.
`

var DEFAULT_CODE = `React.render(<div>Rendered content</div>, output)
`

var redux = createRedux(stores, {
  lessons: {
    editing: false,
    lessons: [{
      name: 'Lesson',
      steps: [
        {text: DEFAULT_TEXT, code: DEFAULT_CODE}
      ]
    }],
    currentLessonIndex: 0,
    currentStepIndex: 0
  }
})

var App = React.createClass({
  render() {
    return <Provider redux={redux}>
      {() =>
        <LessonsApp/>
      }
    </Provider>
  }
})

module.exports = App
