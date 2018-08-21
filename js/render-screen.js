const renderScreen = (screen) => {
  const mainAppWrapElement = document.querySelector(`.main`);
  mainAppWrapElement.innerHTML = ``;
  mainAppWrapElement.appendChild(screen);
};

export {renderScreen};
