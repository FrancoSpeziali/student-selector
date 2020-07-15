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
      this.handleRandomiseClick();
    });
  }

  disableButtons() {
    this.randomiseButtonNode.disabled = true;
    this.resetButtonNode.disabled = true;
  }

  enableButtons() {
    this.randomiseButtonNode.disabled = false;
    this.resetButtonNode.disabled = false;
  }
}
