import AbstractView from "./abstract-view";

export default class ModalErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    const message = this.error.message.split(`, `);
    return `
    <section class="modal-error modal-error__wrap">
      <div class="modal-error__inner">
        <h2 class="modal-error__title">Произошла ошибка!</h2>
        <p class="modal-error__text">Статус: ${message[0]} Пожалуйста, перезагрузите страницу.</p>
      </div>
    </section>
    `;
  }
}
