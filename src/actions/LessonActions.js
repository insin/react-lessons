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

function addLesson() {
  return {
    type: ADD_LESSON
  }
}

function addStep() {
  return {
    type: ADD_STEP
  }
}

function deleteLesson() {
  return {
    type: DELETE_LESSON
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

module.exports = {
  toggleEditing,
  addLesson, selectLesson, updateLesson, deleteLesson,
  addStep, selectStep, updateStep, deleteStep
}
