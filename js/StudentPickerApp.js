import StudentGallery from "./Components/StudentGallery/StudentGallery.js";
import StudentList from "./Components/StudentList/StudentList.js";
import { pickRandomArrayItem } from "./lib/lib.js";

export default class StudentPickerApp {
  constructor({ parent, studentNames, imageUrls }) {
    this.parent = parent;
    this.studentNames = studentNames.map((student, index) => {
      return {
        name: student,
        id: index,
        disabled: false,
      };
    });
    this.imageUrls = imageUrls;

    this.studentList = new StudentList(this.parent, studentNames);
    this.studentGallery = new StudentGallery(this.parent);
  }

  reset() {
    this.studentNames = this.studentNames.map((student) => {
        return {
          ...student,
          disabled: false,
        };
      });
      this.studentList.enableAllStudents();
      this.studentGallery.displayImage("");
      this.studentGallery.displayName("");
  }

  pickRandomStudent() {
    this.studentGallery.displayImage("");

    return new Promise((resolve) => {
      const count = 20;

      let rolls = 0;

      const roll = () => {
        setTimeout(() => {
          const studentNamesToQuestion = this.studentNames.filter(
            (student) => !student.disabled
          );

          const randomStudent = pickRandomArrayItem(studentNamesToQuestion);

          this.studentGallery.displayName(randomStudent.name);
          this.studentList.highlightStudent(randomStudent.id);

          if (rolls !== count) {
            rolls += 1;
            roll();
          } else {
            const randomImage = pickRandomArrayItem(this.imageUrls);

            this.studentGallery.displayImage(randomImage);
            this.disableStudent(randomStudent.id);

            resolve();
          }
        }, 120);
      };

      roll();
    });
  }

  disableStudent(id) {
    this.studentNames[id].disabled = true;
    this.studentList.disableStudent(id);
  }
}