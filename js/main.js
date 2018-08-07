"use strict";

const KeyCode = {
  RIGHT_ARROW: 37,
  LEFT_ARROW: 39
};

const app = document.querySelector(".app");
const main = app.querySelector(".main");

const selectScreen = (screen) => {
  main.innerHTML = "";
  main.appendChild(screen);
};

const arrowsWrapHtml = `<div class="arrows__wrap">
<style>
.arrows__wrap {
  position: absolute;
  top: 135px;
  left: 50%;
  margin-left: -56px;
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`;

app.insertAdjacentHTML("beforeEnd", arrowsWrapHtml);

const templateContent = document.getElementById("templates").content;

const screens = [
  templateContent.querySelector(`.main--welcome`),
  templateContent.querySelector(`.main--level-genre`),
  templateContent.querySelector(`.main--level-artist`),
  templateContent.querySelector(`.main--result`)
];

let currentScreen = 0;

const showCurrentScreen = (index) => {
  index = (index < 0) ? screens.length - 1 : index;
  index = (index >= screens.length) ? 0 : index;
  currentScreen = index;
  selectScreen(screens[currentScreen]);
}

const showNextScreen = () => {
  showCurrentScreen(currentScreen+1);
};

const showPrevScreen = () => {
  showCurrentScreen(currentScreen-1);
};

document.addEventListener("keydown", function (evt) {
  if(evt.keyCode === KeyCode.RIGHT_ARROW) showNextScreen();
  if(evt.keyCode === KeyCode.LEFT_ARROW) showPrevScreen();
});


const buttons = document.querySelectorAll(".arrows__btn");
const lbutton = buttons[0];
const rbutton = buttons[1];

lbutton.addEventListener("click", showPrevScreen);
rbutton.addEventListener("click", showNextScreen);

showCurrentScreen(0);

