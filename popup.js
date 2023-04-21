async function popupInit() {
  try {
    const background = await browser.runtime.getBackgroundPage();
    background.showExperiments = showExperiments;
    background.init();
  } catch(error) {
    console.log(`Error: ${error}`);
  }
}

function showExperiments(experiments) {
  const list = document.getElementById("experiments-list");

  if (!experiments || Object.keys(experiments).length === 0) {
    const p = document.createElement("p");
    const message = document.createTextNode("No active A/B tests found");
    p.appendChild(message);
    
    list.appendChild(p);
  } else {
    for (const key in experiments) {
      const experimentLi = document.createElement('li');
      experimentLi.innerHTML = `<strong>${key}</strong>`;
      const experimentInputElement = document.createElement('input');
      experimentInputElement.value = experiments[key];
      experimentLi.append(experimentInputElement);
      experimentInputElement.addEventListener('input', (e) => { e.target.dataset.changed = true });
      experimentInputElement.addEventListener('blur', (e) => {
        if (e.target.dataset.changed) {
          captureExperimentUpdate(key, e.target.value);
          e.target.dataset.changed = false;
        }
      });
      experimentLi.addEventListener('click', () => { experimentInputElement.focus() });
      list.append(experimentLi);
    }
  }
}

async function captureExperimentUpdate(key, value) {
  const background = await browser.runtime.getBackgroundPage();
  background.relayExperimentUpdate(key, value);
}

popupInit()