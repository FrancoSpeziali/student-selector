import PickerControls from "./Components/PickerControls/PickerControls.js";
import StudentList from "./Components/StudentList/StudentList.js";
import Gallery from "./Components/Gallery/Gallery.js";
import { pickRandomArrayItem } from "./lib/lib.js";
import { studentNames, imageUrls } from "./config.js";

const gallery = new Gallery({
  parent: document.querySelector('#gallery'),
  imageUrls
});

const studentList = new StudentList({
  parent: document.body,
  studentNames
});

const randomise = () => {
  gallery.clearAll();

  return new Promise((resolve) => {
    const count = 20;

    let rolls = 0;

    const roll = () => {
      setTimeout(() => {
        const randomStudent = pickRandomArrayItem(studentList.enabledStudents);

        gallery.displayName(randomStudent.name);
        studentList.highlightStudent(randomStudent.id);

        if (rolls !== count) {
          rolls += 1;
          roll();
        } else {
          gallery.displayRandomImage();
          studentList.toggleDisableStudent(randomStudent.id);

          resolve();
        }
      }, 120);
    };

    roll();
  });
}

const reset = () => {
  gallery.clearAll();
  studentList.enableAllStudents();
}

new PickerControls({
  parent: document.body,
  handleRandomiseClick: randomise,
  handleResetClick: reset
});
