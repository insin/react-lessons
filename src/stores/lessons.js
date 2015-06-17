var {
  SELECT_LESSON,
  SELECT_STEP,
  TOGGLE_EDITING,
  UPDATE_CODE,
  UPDATE_TEXT
} = require('../ActionTypes')

var update = require('react/lib/update')

module.exports = function lessons(state, action) {
  switch (action.type) {
    case TOGGLE_EDITING:
      return {...state, editing: action.editing}
    case SELECT_LESSON:
      return {...state, currentLessonIndex: action.lessonIndex, currentStepIndex: 0}
    case SELECT_STEP:
      return {...state, currentStepIndex: action.stepIndex}
    case UPDATE_CODE:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {
              [state.currentStepIndex]: {
                code: {$set: action.code}
              }
            }
          }
        }
      })
    case UPDATE_TEXT:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {
              [state.currentStepIndex]: {
                text: {$set: action.text}
              }
            }
          }
        }
      })
  }
  return state
}