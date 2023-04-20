browser.runtime.onMessage.addListener(onReceiveExperiments);

function onReceiveExperiments(message) {
  if (message.message !== 'Okay here are some experiments') {
    return;
  };
  showExperiments(message.experiments);
}

async function init() {
  try {
    const tabs = await browser.tabs.query({ currentWindow: true, active: true})
    browser.tabs.sendMessage(tabs[0].id, { message: 'I would like some experiments please' });
  } catch(error) {
    console.log(`Error: ${error}`);
  }
}

async function relayExperimentUpdate(key, value) {
  try {
    const tabs = await browser.tabs.query({ currentWindow: true, active: true})
    browser.tabs.sendMessage(tabs[0].id, { message: 'Updating the experiment', key, variant: value });
  } catch(error) {
    console.log(`Error: ${error}`);
  }
}