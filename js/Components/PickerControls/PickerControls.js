export default class PickerControls {
  constructor({ parent, handleRandomiseClick, handleResetClick }) {
    this.parent = parent;
    this.resetButtonNode = document.createElement("button");
    this.resetButtonNode.textContent = "Reset";

    this.randomiseButtonNode = document.createElement("button");
    this.randomiseButtonNode.textContent = "Randomise";

    parent.append(this.resetButtonNode, this.randomiseButtonNode);

    this.handleRandomiseClick = handleRandomiseClick;
    this.handleResetClick = handleResetClick;

    this.listenForRandomiseClick();
    this.listenForResetClick();
  }

  listenForResetClick() {
    this.resetButtonNode.addEventListener("click", () => {
      this.handleResetClick();
    });
  }

  listenForRandomiseClick() {
    this.randomiseButtonNode.addEventListener("click", () => {
      this.disableButtons();

      this.handleRandomiseClick().then(() => {
        this.enableButtons();
      });
    });
  }

  disableButtons() {
    this.randomiseButtonNode.setAttribute("disabled", "disabled");
    this.resetButtonNode.setAttribute("disabled", "disabled");
  }

  enableButtons() {
    this.randomiseButtonNode.removeAttribute("disabled");
    this.resetButtonNode.removeAttribute("disabled");
  }
}
