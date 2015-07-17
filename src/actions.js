var {action} = require('redux-action-utils')
var types = require('./types')

module.exports = {
  addLesson: action(types.ADD_LESSON),
  addStep: action(types.ADD_STEP),
  deleteLesson: action(types.DELETE_LESSON),
  deleteStep: action(types.DELETE_STEP),
  executeCode: action(types.EXECUTE_CODE, 'code'),
  importLessons: action(types.IMPORT_LESSONS, 'imported'),
  selectLesson: action(types.SELECT_LESSON, 'lessonIndex'),
  selectStep: action(types.SELECT_STEP, 'stepIndex'),
  toggleEditing: action(types.TOGGLE_EDITING, 'editing'),
  updateCode: action(types.UPDATE_CODE, 'code'),
  updateLesson: action(types.UPDATE_LESSON, 'update'),
  updateStep: action(types.UPDATE_STEP, 'update')
}
