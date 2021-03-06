'use babel';

// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'japanese-ten-maru-converter:convert': () => this.convert(),
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'japanese-ten-maru-converter:reconvert': () => this.reconvert(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor();
    let text = editor.getText();
    text = text.replace(/、/g, '，');
    text = text.replace(/。/g, '．');
    editor.setText(text);
  },

  reconvert() {
    const editor = atom.workspace.getActiveTextEditor();
    let text = editor.getText();
    text = text.replace(/，/g, '、');
    text = text.replace(/．/g, '。');
    editor.setText(text);
  },
};
