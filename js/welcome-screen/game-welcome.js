import WelcomeView from './game-welcome-view';
import Application from '../application';

export default class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
    this.view.onClick = () => Application.showGame();
  }

  activeButtonStart() {
    this.view.buttonStartElement.style.borderLeftColor = ``;
    this.view.buttonStartElement.classList.remove(`disable`);
    this.view.buttonStartElement.addEventListener(`click`, this.view.onClick);
  }
}
