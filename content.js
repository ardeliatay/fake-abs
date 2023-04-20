browser.runtime.onMessage.addListener(onRequestExperiments);
browser.runtime.onMessage.addListener(onReceiveExperimentUpdate);

function onRequestExperiments(message) {
  if (message.message !== 'I would like some experiments please') return;
  browser.runtime.sendMessage({ message: 'Okay here are some experiments', experiments: window.wrappedJSObject.experiments });
}

function onReceiveExperimentUpdate(message) {
  if (message.message !== 'Updating the experiment') {
    return;
  };

  window.wrappedJSObject.overrideExperimentVariant(message.key, message.variant);
}
