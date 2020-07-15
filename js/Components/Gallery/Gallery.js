import { pickRandomArrayItem } from '../../lib/lib.js'

export default class Gallery {
  constructor({ parent, imageUrls }) {
    this.textNode = document.createElement("h1");
    this.imageNode = document.createElement("img");

    parent.append(this.textNode, this.imageNode);

    this.imageUrls = imageUrls;
  }

  displayName(name) {
    this.textNode.textContent = name;
  }

  displayRandomImage() {
    const randomImage = pickRandomArrayItem(this.imageUrls);

    this.imageNode.setAttribute("src", randomImage);
  }

  clearAll() {
    this.textNode.textContent = "";
    this.imageNode.setAttribute("src", "");
  }
}
