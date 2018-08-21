import ResultView from './game-result-view';
import Application from '../application';

export default class ResultScreen {
  constructor(model) {
    this.model = model;
    this.view = new ResultView(this.model.resultState);
    this.view.onClick = () => Application.showWelcome();
  }

  getPlayerResult() {
    return this.model.getPlayerResult();
  }

  showScores(data) {
    const scores = this.model.getScores(data);
    this.view.scoresElement.textContent = scores;
  }
}
