# a generic editor class
class Editor
  # create an editor instance
  # @param instance [Editor] the editor object
  constructor: (@editor) ->

  # get the current cursor position
  getCursor: () -> throw new Error "Implement me"
  # set the current cursor position
  # @param param [Option] the options
  # @option param [Integer] id the id of the author
  # @option param [Integer] index the index of the cursor
  # @option param [String] text the text of the cursor
  # @option param [String] color the color of the cursor
  setCursor: (param) -> throw new Error "Implement me"

  # describe how to pass local modifications of the text to the backend.
  # @param backend [Function] the function to pass the delta to
  # @note The backend function takes a list of deltas as argument
  observeLocalText: (backend) -> throw new Error "Implement me"

  # describe how to pass local modifications of the cursor to the backend
  # @param backend [Function] the function to pass the new position to
  # @note the backend function takes a position as argument
  observeLocalCursor: (backend) -> throw new Error "Implement me"

  # Get a delta and apply it to the editor
  # @param delta [Delta] the delta to propagate to the editor
  # @see https://github.com/ottypes/rich-text
  setContents: (delta) -> throw new Error "Implement me"

class QuillJs extends Editor
  constructor: (@editor) ->
    super @editor
    @_cursors = @editor.getModule("multi-cursor")

  getCursorPosition: ->
    selection = @editor.getSelection()
    if selection
      selection.start
    else
      0

  setCursor: (param) ->
    @_cursors.setCursor param.id, param.index, param.text, param.color

  observeLocalText: (backend) ->
    @editor.on "text-change", (deltas, source) ->
      # call the backend with deltas
      backend deltas.ops

  observeLocalCursor: (backend) ->
    @editor.on "selection-change", (range) ->
      # only when there's a cursor (range start === range end)
      if range and range.start == range.end then backend range.start

  setContents: (delta) ->
    @editor.setContents delta

# a test class for editors
class TestEditor extends Editor
  constructor: () ->
    super

  getCursor: () ->
    -1
  setCursor: (param) ->
    true
  observeLocalText: (backend) ->
    ""
  observeLocalCursor: (backend) ->
    ""
  setContents: (delta) ->
    console.log delta

if module?
  module.exports =
    QuillJS: QuillJS
    TestEditor: TestEditor
    Editor: Editor