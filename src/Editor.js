export default class Editor {
  constructor(content) {
    this.editor = monaco.editor.create(document.getElementById('container'), {
      value: content.join('\n'),
      language: 'markdown',
      theme: 'vs-dark',
    });
    this.actions(this.editor);
    this.bindings(this.editor);
  }
  actions(editor) {
    editor.addAction({
      id: 'my-save',
      label: 'save',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      ],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: function (ed) {
        save();
        return null;
      }
    });
  }
  bindings(editor) {
    // 快捷键--F9，添加一个代码块，或者将选中目标变为代码块 
    var myBinding = editor.addCommand(monaco.KeyCode.F9, function () {
      const selection = editor.getSelection();
      if (selection.isEmpty()) {
        const { column, lineNumber } = editor.getPosition()
        editor.setValue(editor.getValue() + '\n```\n\n```')
        editor.setPosition({ column: 1, lineNumber: lineNumber + 2 })
      } else {
        const s = { endColumn, endLineNumber, startColumn, startLineNumber } = editor.getSelection();
        const selectionText = editor.getModel().getValueInRange(s)
        const { column, lineNumber } = editor.getPosition()
        editor.setValue(editor.getValue().replace(selectionText, '```\n' + selectionText + '\n```'))
        editor.setPosition({ column: 4, lineNumber: startColumn })
      }
    });
  }
  created(){

  }
}
