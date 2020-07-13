import { CLICK_RANDOMISE, CLICK_RESET } from '../../constants/eventTypes.js';

class PickerControlsError extends Error {};

export default class PickerControls {
    constructor(parent) {
        this.parent = parent;
        this.resetButtonNode = document.createElement('button');
        this.resetButtonNode.textContent = 'Reset';

        this.randomiseButtonNode = document.createElement('button');
        this.randomiseButtonNode.textContent = 'Randomise';

        parent.append(this.resetButtonNode, this.randomiseButtonNode);

        this.handleResetClick();
        this.handleRandomiseClick();
    }

    handleResetClick() {
        this.resetButtonNode.addEventListener('click', () => {
            const event = new CustomEvent(CLICK_RESET);

            this.parent.dispatchEvent(event);
        });
    }

    handleRandomiseClick() {
        this.randomiseButtonNode.addEventListener('click', () => {
            const event = new CustomEvent(CLICK_RANDOMISE, {
                detail: {
                    callback: () => {
                        this.randomiseButtonNode.removeAttribute('disabled');
                    }
                }
            });

            this.randomiseButtonNode.setAttribute('disabled', 'disabled');

            this.parent.dispatchEvent(event);
        });
    }
}