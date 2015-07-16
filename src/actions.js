var types = require('./types')

var createAction = (type, ...props) =>
  (...args) =>
    props.reduce((action, prop, i) => (action[prop] = args[i], action), {type})

module.exports = {
  addLesson: createAction(types.ADD_LESSON),
  addStep: createAction(types.ADD_STEP),
  deleteLesson: createAction(types.DELETE_LESSON),
  deleteStep: createAction(types.DELETE_STEP),
  executeCode: createAction(types.EXECUTE_CODE, 'code'),
  importLessons: createAction(types.IMPORT_LESSONS, 'imported'),
  selectLesson: createAction(types.SELECT_LESSON, 'lessonIndex'),
  selectStep: createAction(types.SELECT_STEP, 'stepIndex'),
  toggleEditing: createAction(types.TOGGLE_EDITING, 'editing'),
  updateCode: createAction(types.UPDATE_CODE, 'code'),
  updateLesson: createAction(types.UPDATE_LESSON, 'update'),
  updateStep: createAction(types.UPDATE_STEP, 'update')
}
