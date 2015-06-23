var Base64 = require('base-64')

function exportJSON(lessons, filename='export.json') {
  var json = JSON.stringify(lessons, null, 2)
  var json64 = Base64.encode(json)
  var a = document.createElement('a')
  if ('download' in a) {
    a.href = `data:text/json;base64,${json64}`
    a.download = filename
    var event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                         false, false, false, false, 0, null)
    a.dispatchEvent(event)
  }
  else if (typeof navigator.msSaveBlob == 'function') {
    navigator.msSaveBlob(new window.Blob([json], {
      type: 'text/json;charset=utf-8;'
    }), filename)
  }
  else {
    window.location.href = `data:application/octet-stream;base64,${json64}`
  }
}

module.exports = exportJSON
