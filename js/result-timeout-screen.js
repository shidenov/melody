import {renderScreen, createScreenElement} from './kernel';
import welcomeScreen from './welcome-screen';

/* Результат игры: проигрыш время вышло */
let resultTimeOutScreen = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

resultTimeOutScreen = createScreenElement(resultTimeOutScreen);
const playAgainButton = resultTimeOutScreen.querySelector(`.main-replay`);
playAgainButton.addEventListener(`click`, () => renderScreen(welcomeScreen));

export default resultTimeOutScreen;
