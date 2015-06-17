var {
  ADD_STEP,
  DELETE_STEP,
  SELECT_LESSON,
  SELECT_STEP,
  TOGGLE_EDITING,
  UPDATE_LESSON,
  UPDATE_STEP
} = require('../ActionTypes')

function addStep() {
  return {
    type: ADD_STEP,
  }
}

function deleteStep() {
  return {
    type: DELETE_STEP
  }
}

function selectLesson(lessonIndex) {
  return {
    type: SELECT_LESSON,
    lessonIndex
  }
}

function selectStep(stepIndex) {
  return {
    type: SELECT_STEP,
    stepIndex
  }
}

function toggleEditing(editing) {
  return {
    type: TOGGLE_EDITING,
    editing
  }
}

function updateLesson(update) {
  return {
    type: UPDATE_LESSON,
    update
  }
}

function updateStep(update) {
  return {
    type: UPDATE_STEP,
    update
  }
}

module.exports = {addStep, deleteStep, selectLesson, selectStep, toggleEditing, updateLesson, updateStep}