import {renderScreen, createScreenElement} from './kernel';
import welcomeScreen from './welcome-screen';

/* Результат игры: проигрыш закончились попытки */
let resultLoseScreen = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

resultLoseScreen = createScreenElement(resultLoseScreen);
const playAgainButton = resultLoseScreen.querySelector(`.main-replay`);
playAgainButton.addEventListener(`click`, () => renderScreen(welcomeScreen));

export default resultLoseScreen;
