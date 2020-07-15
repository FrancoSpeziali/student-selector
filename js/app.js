import PickerControls from "./Components/PickerControls/PickerControls.js";
import StudentList from "./Components/StudentList/StudentList.js";
import Gallery from "./Components/Gallery/Gallery.js";
import { pickRandomArrayItem, runAtIntervals } from "./lib/lib.js";
import {
  studentNames,
  imageUrls,
  studentRotations,
  highestRotationDelay,
} from "./config.js";

const randomise = () => {
  gallery.clearAll();
  pickerControls.disableButtons();

  let randomStudent;

  const randomiseStudent = runAtIntervals({
    intervals: studentRotations,
    intervalAzmiuth: highestRotationDelay,
    callbackInterval: () => {
      randomStudent = pickRandomArrayItem(studentList.enabledStudents);
      gallery.displayName(randomStudent.name);
      studentList.highlightStudent(randomStudent.id);
    },
  });

  randomiseStudent.then(() => {
    gallery.displayRandomImage();
    studentList.toggleDisableStudent(randomStudent.id);
    pickerControls.enableButtons();
  });
};

const reset = () => {
  gallery.clearAll();
  studentList.enableAllStudents();
};

const gallery = new Gallery({
  parent: document.querySelector("#gallery"),
  imageUrls,
});

const studentList = new StudentList({
  parent: document.body,
  studentNames,
});

const pickerControls = new PickerControls({
  parent: document.body,
  handleRandomiseClick: randomise,
  handleResetClick: reset,
});
