const renderScreen = (screen) => {
  const mainAppWrap = document.querySelector(`.app`).children[0];
  mainAppWrap.innerHTML = ``;
  mainAppWrap.appendChild(screen);
};

const createScreenElement = (html) => {
  const parser = new DOMParser();
  const screen = parser.parseFromString(html, `text/html`).body.firstElementChild;
  return screen;
};

export {renderScreen, createScreenElement};
