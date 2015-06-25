function parseJSONFile(file, cb) {
  var reader = new window.FileReader()
  reader.onload = (e) => {
    var json = e.target.result
    try {
      cb(null, JSON.parse(json))
    }
    catch (e) {
      cb(e)
    }
  }
  reader.readAsText(file)
}

module.exports = parseJSONFile
