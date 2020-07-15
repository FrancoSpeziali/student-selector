export default class StudentList {
  constructor({ parent, studentNames }) {
    this.listNode = document.createElement("ul");

    parent.append(this.listNode);

    this._students = studentNames.map((student, index) => {
      return {
        name: student,
        id: index,
        disabled: false,
        highlighted: false
      };
    });

    this.render();
  }

  get enabledStudents() {
    return this._students.filter((student) => !student.disabled);
  }

  render() {

    if(this.listNode.hasChildNodes()) {
      do {
        this.listNode.firstChild.remove();
      }
      while(this.listNode.hasChildNodes());
    }

    this._students.forEach((student) => {
      const node = document.createElement("li");
      const toggleStudent = document.createElement("button");

      toggleStudent.onclick = () => {
        this.toggleDisableStudent(student.id);
      };

      toggleStudent.textContent = "T";

      node.textContent = student.name;
      node.dataset.id = student.id;

      if(student.disabled) {
        node.classList.add("disable");
      }

      if(student.highlighted) {
        node.classList.add("highlight");
      }

      node.append(toggleStudent);

      this.listNode.append(node);
    });
  }

  /**
   * Only 1 student can be highlighted at a time
   */
  highlightStudent(id) {
    const existing = this._students.find(student => student.highlighted);

    if(existing) {
      existing.highlighted = false;
    }

    const target = this._students.find(student => student.id === id);

    target.highlighted = !target.highlighted;

    this.render();
  }

  toggleDisableStudent(id) {
    const target = this._students.find(student => student.id === id);

    target.disabled = !target.disabled;

    this.render();
  }

  enableAllStudents() {
    this._students.forEach((student) => {
      student.disabled = false;
      student.highlighted = false;
    });

    this.render();
  }
}
