var {
  ADD_LESSON,
  ADD_STEP,
  DELETE_LESSON,
  DELETE_STEP,
  SELECT_LESSON,
  SELECT_STEP,
  TOGGLE_EDITING,
  UPDATE_LESSON,
  UPDATE_STEP
} = require('../ActionTypes')

var update = require('react/lib/update')

var defaultStep = {text: '', code: '', solution: ''}
var defaultLesson = {name: '', steps: [{...defaultStep}]}

module.exports = function lessons(state, action) {
  switch (action.type) {
    case ADD_LESSON:
      return update(state, {
        lessons: {$push: [{...defaultLesson}]}
      })
    case ADD_STEP:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {$push: [{...defaultStep}]}
          }
        }
      })
    // Assumption: you can only delete lessons when there is more than one
    case DELETE_LESSON:
      return update(state, {
        lessons: {$splice: [[state.currentLessonIndex, 1]]},
        // If the last lesson is being deleted, we need to adjust the current index
        currentLessonIndex: {$set: Math.min(state.currentLessonIndex, state.lessons.length - 2)}
      })
    // Assumption: you can only delete lesson steps when there is more than one
    case DELETE_STEP:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {
            steps: {$splice: [[state.currentStepIndex, 1]]}
          }
        },
        // If the last step is being deleted, we need to adjust the current index
        currentStepIndex: {
          $set: Math.min(state.currentStepIndex,
                         state.lessons[state.currentLessonIndex].steps.length - 2)
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