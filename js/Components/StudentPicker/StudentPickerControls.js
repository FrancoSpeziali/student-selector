import StudentPickerAbstract from './StudentPickerAbstract.js';

class StudentPickerControlsError extends Error {};

export default class StudentPickerControls extends StudentPickerAbstract {
    constructor(parentSelector) {
        super(parentSelector);

        this.textNode = document.createElement('h1');
        this.imageNode = document.createElement('img');

        this.parent.append(this.textNode, this.imageNode);
    }
}