## React Lessons

React Lessons is a tool for creating - and taking - interactive
[React](http://facebook.github.io/react/) tutorials, inspired by the
[Ractive.js Tutorial](http://learn.ractivejs.org).

----

A tutorial consists of one or more lessons.

### Lesson steps

Each lesson can contain one or more steps. A lesson step consists of:

* Text explaining the purpose of the step, providing learning material and
  giving instructions for the piece of code that needs to be written using the
  material introduced by the step.

* An outline for code to be written to practice the step's material.

### Writing JavaScript code

JavaScript code can be written in the code panel and executed by pressing
Shift+Enter or using the Execute button underneath the code.

The following variables are available for use in code:

* `React` - the React library.

* `output` - the DOM node for the tutorial output area.

Code is transformed with [Babel](http://babeljs.io) before being executed, so
you can use:

* [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) - the XML-like
  syntax React uses to make generating content in JavaScript less unpleasant.

* [ECMAScript 6 features](http://babeljs.io/docs/learn-es2015/#ecmascript-6-features)

* [ECMAScript 7 proposals](http://babeljs.io/docs/usage/experimental/)
  experimentally supported by Babel.

### Editing mode

Toggling the "Edit Mode" checkbox on enters editing mode. In editing mode, you
can change the lesson name and edit the content of each step.

#### Step text

Step text is written in [Markdown](http://daringfireball.net/projects/markdown/basics).

#### Step code & solution

In editing mode, "Code" and "Solution" tabs will appear in the coding area:

* Code is what the user will see when they first open the step.

* Solution (if provided) will allow use of the "Fix code" button to see a
  solution for the coding challenge.

#### Creating and deleting lessons and steps

In editing mode, extra toolbar buttons are also displayed to allow you to add
new lessons and steps, or to delete the currently-selected lesson or step.

When you have more than one lesson in a tutorial, a menu will pop up on the left
side of the page to allow you to navigate between them.

### Exporting lessons

In editing mode, you can export the current lesson or the complete tutorial
using the "Export Lesson" and "Export All" buttons.

This will prompt you to download a `.json` file containing lesson definitions.

### Importing lessons

A lesson or an entire tutorial can be imoprted by dropping a `.json` file onto
the toolbar at any time.

**Warning:** if you import an entire tutorial, its lessons will replace
everything you currently have - be careful with this when editing!

## MIT Licensed
