// From https://gist.github.com/dzannotti/9a0efaf04072069fa63b

var CodeMirror = require('codemirror')

CodeMirror.defineMode('jsx', function(config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, 'javascript'), {
      open: '<', close: '>',
      mode: CodeMirror.multiplexingMode(
        CodeMirror.getMode(config, {name: 'xml', htmlMode: true}), {
          open: '{', close: '}',
          mode: CodeMirror.getMode(config, 'javascript'),
          parseDelimiters: false
        }
      ),
      parseDelimiters: true
    })
})

CodeMirror.defineMIME('text/jsx', 'jsx')
