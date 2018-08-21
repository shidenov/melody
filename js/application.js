import WelcomeScreen from './welcome-screen/game-welcome';
import GameScreen from './game-screen/game-screen';
import GameModel from './game-screen/game-model';
import ResultScreen from './result-screen/game-result';
import ResultModel from './result-screen/game-result-model';
import ModalErrorView from './modal-window/modal-error-view';
import LoaderApi from './data/loader-data';
import Music from './data/music-data';
import {renderScreen} from './render-screen';

let gameData;
const welcomeScreen = new WelcomeScreen();

export default class Application {
  static start() {
    LoaderApi.loadQuestions()
      .then((data) => {
        gameData = data;
        Application.showWelcome();
        return Music.loadAudioTracks(data);
      })
      .then((audioTracks) => Promise.all(audioTracks))
      .then((audioElements) => {
        audioElements.forEach((track) => {
          track.pause();
          track.currentTime = 0;
        });
        welcomeScreen.activeButtonStart();
      })
      .catch(Application.showError);
  }

  static showWelcome() {
    renderScreen(welcomeScreen.view.element);
  }

  static showGame() {
    const model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showResult(gameState) {
    const model = new ResultModel(gameState);
    const resultScreen = new ResultScreen(model);
    renderScreen(resultScreen.view.element);

    const result = resultScreen.getPlayerResult();
    if (result) {
      LoaderApi.loadResults()
        .then((data) => resultScreen.showScores(data))
        .then(() => LoaderApi.saveResults(result))
        .catch(Application.showError);
    }
  }

  static showError(error) {
    const modalError = new ModalErrorView(error);
    document.body.appendChild(modalError.element);
  }
}
