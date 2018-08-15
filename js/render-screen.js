const renderScreen = (screen) => {
  const mainAppWrap = document.querySelector(`.app`).children[0];
  mainAppWrap.innerHTML = ``;
  mainAppWrap.appendChild(screen);
};

export {renderScreen};
