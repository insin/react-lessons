var {
  ADD_LESSON,
  ADD_STEP,
  DELETE_LESSON,
  DELETE_STEP,
  EXECUTE_CODE,
  IMPORT_LESSONS,
  SELECT_LESSON,
  SELECT_STEP,
  TOGGLE_EDITING,
  UPDATE_CODE,
  UPDATE_LESSON,
  UPDATE_STEP
} = require('../ActionTypes')

var createAction = (type, ...props) =>
  (...args) =>
    props.reduce((action, prop, i) => (action[prop] = args[i], action), {type})

module.exports = {
  addLesson: createAction(ADD_LESSON),
  addStep: createAction(ADD_STEP),
  deleteLesson: createAction(DELETE_LESSON),
  deleteStep: createAction(DELETE_STEP),
  executeCode: createAction(EXECUTE_CODE, 'code'),
  importLessons: createAction(IMPORT_LESSONS, 'imported'),
  selectLesson: createAction(SELECT_LESSON, 'lessonIndex'),
  selectStep: createAction(SELECT_STEP, 'stepIndex'),
  toggleEditing: createAction(TOGGLE_EDITING, 'editing'),
  updateCode: createAction(UPDATE_CODE, 'code'),
  updateLesson: createAction(UPDATE_LESSON, 'update'),
  updateStep: createAction(UPDATE_STEP, 'update')
}
