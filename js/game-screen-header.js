/* header template */
export const headerTemplate = (state, svg) => `
  <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle cx="390" cy="390" r="370" class="timer-line" stroke-dasharray="${svg.stroke}" stroke-dashoffset="${svg.offset}" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
    </div>
  </svg>
  <div class="main-mistakes">
    ${new Array((state.lives - 2) * -1).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
  </div>
`;
