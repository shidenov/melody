import ResultView from './game-result-view';
import Application from './application';

export default class ResultScreen {
  constructor(gameState) {
    this.view = new ResultView(gameState);
    this.view.onClick = () => Application.showWelcome();
  }
}
