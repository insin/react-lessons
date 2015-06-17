var {
  ADD_STEP,
  DELETE_STEP,
  SELECT_LESSON,
  SELECT_STEP,
  TOGGLE_EDITING,
  UPDATE_LESSON,
  UPDATE_STEP
} = require('../ActionTypes')

var update = require('react/lib/update')

module.exports = function lessons(state, action) {
  switch (action.type) {
    case ADD_STEP:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {$push: [{text: '', code: '', solution: ''}]}
          }
        }
      })
    case DELETE_STEP:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {$splice: [[state.currentStepIndex, 1]]}
          }
        }
      })
    case TOGGLE_EDITING:
      return {...state, editing: action.editing}
    case SELECT_LESSON:
      return {...state, currentLessonIndex: action.lessonIndex, currentStepIndex: 0}
    case SELECT_STEP:
      return {...state, currentStepIndex: action.stepIndex}
    case UPDATE_LESSON:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {$merge: action.update}
        }
      })
    case UPDATE_STEP:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {
              [state.currentStepIndex]: {$merge: action.update}
            }
          }
        }
      })
  }
  return state
}