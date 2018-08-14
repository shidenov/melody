import {createScreenElement, renderScreen} from './kernel';
import {getCurrentDataGame} from './data/music-data';
import {GAME} from './data/game-data';
import {gameScreen} from './game-screen';

/* Приветствие */
let welcomeScreen = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию">
      <h1>Угадай мелодию</h1>
    </section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
          Удачи!
      </p>
  </section>
`;

welcomeScreen = createScreenElement(welcomeScreen);
const buttonStart = welcomeScreen.querySelector(`.main-play`);

buttonStart.addEventListener(`click`, () => {
  const currentGameData = getCurrentDataGame(0);
  const newGame = Object.assign({}, GAME);
  newGame.answers = [];

  const game = gameScreen(currentGameData, newGame);
  renderScreen(game);
});

export default welcomeScreen;
