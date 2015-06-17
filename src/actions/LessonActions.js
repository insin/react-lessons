var {
  SELECT_LESSON,
  SELECT_STEP,
  TOGGLE_EDITING,
  UPDATE_CODE,
  UPDATE_TEXT
} = require('../ActionTypes')

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

function updateCode(code) {
  return {
    type: UPDATE_CODE,
    code
  }
}

function updateText(text) {
  return {
    type: UPDATE_TEXT,
    text
  }
}

module.exports = {selectLesson, selectStep, toggleEditing, updateCode, updateText}