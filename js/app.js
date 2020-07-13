import PickerControls from './Components/PickerControls/PickerControls.js';
import StudentGallery from './Components/StudentGallery/StudentGallery.js';
import StudentList from './Components/StudentList/StudentList.js';
import { pickRandomArrayItem } from './lib/lib.js';
import { students, images } from './config.js';
import { CLICK_RANDOMISE, CLICK_RESET } from './constants/eventTypes.js';

class StudentPickerAppError extends Error {}

class StudentPickerApp {
    constructor({ students, images }) {
        this.parent = document.body;
        this.students = students.map((student, index) => {
            return {
                name: student,
                id: index,
                disabled: false
            };
        });
        this.images = images;

        this.pickerControls = new PickerControls(this.parent);
        this.studentList = new StudentList(this.parent, students);
        this.studentGallery = new StudentGallery(this.parent);

        this.handleRandomiseClick();
        this.handleResetClick();
    }

    handleRandomiseClick() {
        this.parent.addEventListener(CLICK_RANDOMISE, (event) => {
            if(typeof event.detail.callback !== 'function') {
                throw new StudentPickerAppError('No callback found for randomise button');
            }

            this.pickRandomStudent()
                .then(() => {
                    event.detail.callback();
                });
        });
    }

    handleResetClick() {
        this.parent.addEventListener(CLICK_RESET, () => {
            this.students = this.students.map((student) => {
                return {
                    ...student,
                    disabled: false
                }
            });

            this.studentList.enableAllStudents();
            this.studentGallery.displayImage('');
            this.studentGallery.displayName('');
        });
    }

    pickRandomStudent() {

        this.studentGallery.displayImage('');

        return new Promise((resolve) => {

            const count = 10;

            let rolls = 0;

            const roll = () => {
    
                setTimeout(() => {
                    const studentsToQuestion = this.students.filter((student) => !student.disabled);

                    const randomStudent = pickRandomArrayItem(studentsToQuestion);

                    this.studentGallery.displayName(randomStudent.name);
                    this.studentList.highlightStudent(randomStudent.id);
    
                    if(rolls !== count) {
                        rolls += 1;
                        roll();
                    } else {
                        const randomImage = pickRandomArrayItem(this.images);

                        this.studentGallery.displayImage(randomImage);
                        this.disableStudent(randomStudent.id);

                        resolve();
                    }
    
                }, 100);
            }
    
            roll();

        });
    }

    disableStudent(id) {
        this.students[id].disabled = true;
        this.studentList.disableStudent(id);
    }
}

new StudentPickerApp({ students, images });