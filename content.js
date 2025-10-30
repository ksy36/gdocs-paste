(function() {
  'use strict';

  const privilegedExec = Object.getOwnPropertyDescriptor(
      Document.prototype,
      "execCommand"
  ).value;

  function allowPastingOnDocument(doc) {
    doc.execCommand = exportFunction(function () {
      return privilegedExec.apply(this, arguments);
    }, window);
  }
  allowPastingOnDocument(document.wrappedJSObject);

  const { queryCommandSupported } = Document.prototype.wrappedJSObject;

  Object.defineProperty(
      Document.prototype.wrappedJSObject,
      "queryCommandSupported",
      {
        configurable: true,
        enumerable: true,
        writable: true,
        value: exportFunction(function (commandId) {
          if (commandId.toLowerCase() === "paste") {
            return true;
          }

          return queryCommandSupported.call(this, commandId);
        }, window),
      }
  );
})();
