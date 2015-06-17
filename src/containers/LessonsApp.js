var React = require('react')
var {bindActionCreators} = require('redux')
var {Connector} = require('redux/react')
var Lessons = require('../components/Lessons')
var LessonActions = require('../actions/LessonActions')

require('./LessonsApp.css')

var LessonsApp = React.createClass({
  render() {
    return <Connector select={state => { console.log(state); return state }}>
      {({lessons, dispatch}) => {
        debugger
        var actions = bindActionCreators(LessonActions, dispatch)
        return <div className="App">
          <div className="App__admin">
            <label>
              <input type="checkbox" checked={lessons.editing} onChange={(e) => actions.toggleEditing(e.target.checked)}/>{' '}
              Edit Lessons
            </label>
          </div>
          <Lessons {...lessons} actions={actions}/>
        </div>
      }}
    </Connector>
  }
})

module.exports = LessonsApp