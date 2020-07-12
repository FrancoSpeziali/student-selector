import StudentPickerAbstract from './StudentPickerAbstract.js';

class StudentPickerGalleryError extends Error {};

export default class StudentPickerGallery extends StudentPickerAbstract {
    constructor(parentSelector) {
        super(parentSelector);

        this.textNode = document.createElement('h1');
        this.imageNode = document.createElement('img');

        this.parent.append(this.textNode, this.imageNode);
    }

    displayName(name) {
        this.textNode.textContent = name;
    }

    displayImage(imageUrl) {
        this.imageNode.setAttribute(imageUrl);
    }
}
