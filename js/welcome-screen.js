import {renderScreen, createScreenElement} from './kernel';
import gameArtistScreen from './game-artist-screen';

/* Приветствие */
let welcomeScreen = `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
        Удачи!
    </p>
  </section>`;

welcomeScreen = createScreenElement(welcomeScreen);
const buttonStart = welcomeScreen.querySelector(`.main-play`);
buttonStart.addEventListener(`click`, () => renderScreen(gameArtistScreen));

export default welcomeScreen;
