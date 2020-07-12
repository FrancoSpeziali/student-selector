class StudentPickerAbstractError extends Error {};

export default class StudentPickerAbstract {
    constructor(parentSelector) {
        this.parent = document.querySelector(parentSelector);

        if(!this.parent instanceof HTMLElement) {
            throw new StudentPickerAbstract('Parent selector not a valid HTML Element');
        }
    }
}