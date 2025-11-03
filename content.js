(function () {
  "use strict";

  function tryPaste(doc, cmd) {
    if (cmd.toLowerCase() === "paste") {
      Document.prototype.execCommand.call(doc, "paste");
      return true;
    }
    throw "Command called with execCommand is not a paste";
  }

  window.wrappedJSObject._overrideExecCommand?.(exportFunction(tryPaste, window));
})();
