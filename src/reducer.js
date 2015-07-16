var update = require('react/lib/update')

var types = require('./types')
var uuid = require('./utils/uuid')

function createStep() {
  return {id: uuid(), text: '', code: '', solution: ''}
}

function createLesson() {
  return {id: uuid(), name: '', steps: [createStep()]}
}

var defaultState = {
  code: '',
  currentLessonIndex: 0,
  currentStepIndex: 0,
  editing: true,
  executedCode: '',
  lessons: [createLesson()]
}

module.exports = function lessons(state=defaultState, action) {
  var code

  switch (action.type) {
    case types.ADD_LESSON:
      return {
        ...state,
        lessons: update(state.lessons, {$push: [createLesson()]}),
        currentLessonIndex: state.lessons.length,
        currentStepIndex: 0
      }
    case types.ADD_STEP:
      return {
        ...state,
        lessons: update(state.lessons, {
          [state.currentLessonIndex]: {
            steps: {$push: [createStep()]}
          }
        }),
        currentStepIndex: state.lessons[state.currentLessonIndex].steps.length
      }
    // Assumption: you can only delete lessons when there is more than one
    case types.DELETE_LESSON:
      return {
        ...state,
        lessons: update(state.lessons, {$splice: [[state.currentLessonIndex, 1]]}),
        // If the last lesson is being deleted, we need to adjust the current index
        currentLessonIndex: Math.min(state.currentLessonIndex, state.lessons.length - 2),
        currentStepIndex: 0
      }
    // Assumption: you can only delete lesson steps when there is more than one
    case types.DELETE_STEP:
      return {
        ...state,
        lessons: update(state.lessons, {
          [state.currentLessonIndex]: {
            steps: {$splice: [[state.currentStepIndex, 1]]}
          }
        }),
        // If the last step is being deleted, we need to adjust the current index
        currentStepIndex: Math.min(state.currentStepIndex,
                                   state.lessons[state.currentLessonIndex].steps.length - 2)
      }
    case types.EXECUTE_CODE:
      return {...state, executedCode: action.code}
    case types.IMPORT_LESSONS:
      if (Array.isArray(action.imported)) {
        return {
          ...state,
          lessons: action.imported,
          currentLessonIndex: 0,
          currentStepIndex: 0
        }
      }
      return update(state, {
        lessons: {$push: [action.imported]}
      })
    case types.TOGGLE_EDITING:
      return {...state, editing: action.editing}
    case types.SELECT_LESSON:
      code = state.lessons[action.lessonIndex].steps[0].code
      return {
        ...state,
        code,
        currentLessonIndex: action.lessonIndex,
        currentStepIndex: 0,
        executedCode: code
      }
    case types.SELECT_STEP:
      code = state.lessons[state.currentLessonIndex].steps[action.stepIndex].code
      return {
        ...state,
        code,
        currentStepIndex: action.stepIndex,
        executedCode: code
      }
    case types.UPDATE_CODE:
      return {...state, code: action.code}
    case types.UPDATE_LESSON:
      return update(state, {
        lessons: {
          [state.currentLessonIndex]: {$merge: action.update}
        }
      })
    case types.UPDATE_STEP:
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
