import PickerControls from "./Components/PickerControls/PickerControls.js";
import StudentPickerApp from "./StudentPickerApp.js";
import { studentNames, imageUrls } from "./config.js";

const studentPickerApp = new StudentPickerApp({
  parent: document.body,
  studentNames,
  imageUrls,
});

const handleRandomiseClick = studentPickerApp.pickRandomStudent.bind(studentPickerApp);
const handleResetClick = studentPickerApp.reset.bind(studentPickerApp);

new PickerControls({
  parent: document.body,
  handleRandomiseClick,
  handleResetClick
});
