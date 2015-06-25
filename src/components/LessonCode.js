var classNames = require('classnames')
var CodeMirror = require('react-codemirror')
var React = require('react')

require('./LessonCode.css')

function tabClassNames(tab, activeTab) {
  return classNames('LessonCode__tab', {
    'LessonCode__tab--active': tab === activeTab
  })
}

var LessonCode = React.createClass({
  getInitialState() {
    return {
      activeTab: 'code'
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.editing !== nextProps.editing ||
        this.props.currentLessonIndex !== nextProps.currentLessonIndex ||
        this.props.currentStepIndex !== nextProps.currentStepIndex) {
      this.setState({
        activeTab: 'code'
      })
    }
  },
  handleChangeTab(activeTab) {
    this.setState({activeTab})
  },
  handleExecuteCode() {
    this.props.executeCode(this.props.editing
                           ? this.props.step[this.state.activeTab]
                           : this.props.code)
  },
  handleChange(code) {
    if (!this.props.editing) {
      if (code !== this.props.code) {
        this.props.updateCode(code)
      }
    }
    else {
      if (code !== this.props.step[this.state.activeTab]) {
        this.props.updateStep({[this.state.activeTab]: code})
      }
    }
  },
  render() {
    var {editing, step} = this.props
    var {activeTab} = this.state
    return <div className="LessonCode">
      {editing && <div className="LessonCode__tabs">
        <div className={tabClassNames('code', activeTab)}
             onClick={this.handleChangeTab.bind(this, 'code')}>
          Code
        </div>
        <div className={tabClassNames('solution', activeTab)}
             onClick={this.handleChangeTab.bind(this, 'solution')}>
          Solution
        </div>
      </div>}
      <CodeMirror
        onChange={this.handleChange}
        options={{
          extraKeys: {'Shift-Enter': this.handleExecuteCode},
          lineNumbers: true,
          mode: 'javascript',
          smartIndent: false,
          tabSize: 2
        }}
        value={editing ? step[activeTab] : this.props.code}
      />
      <div className="LessonCode__buttons">
        <button type="button" className="LessonCode__execute" onClick={this.handleExecuteCode}>
          Execute (Shift+Enter)
        </button>
      </div>
    </div>
  }
})

module.exports = LessonCode
