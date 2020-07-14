export default class StudentGallery {
  constructor(parent) {
    this.textNode = document.createElement("h1");
    this.imageNode = document.createElement("img");

    parent.append(this.textNode, this.imageNode);
  }

  displayName(name) {
    this.textNode.textContent = name;
  }

  displayImage(imageUrl) {
    this.imageNode.setAttribute("src", imageUrl);
  }
}
