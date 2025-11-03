(function () {
  "use strict";

  const originalExecCommand = Document.prototype.execCommand;

  window._overrideExecCommand = function (tryPaste) {
    delete window._overrideExecCommand;

    Document.prototype.execCommand = function (cmd) {
      try {
        return tryPaste(this, cmd);
      } catch (e) {
        return originalExecCommand.apply(this, arguments);
      }
    };
  };

  const originalQueryCommandSupported = Document.prototype.queryCommandSupported;

  Document.prototype.queryCommandSupported = function (commandId) {
    if (commandId.toLowerCase() === "paste") {
      return true;
    }
    return originalQueryCommandSupported.call(this, commandId);
  };
})();
