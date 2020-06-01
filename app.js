class StudentPicker {
    constructor({ element, students, imageUrls }) {
        this.parentElement = element;
        this.originalStudentList = students;
        this.students = students;
        this.imageUrls = imageUrls;
        this.element = document.createElement('div');
        this.textNode = document.createElement('h1');
        this.imageNode = document.createElement('img');

        this.element.appendChild(this.textNode);
        this.element.appendChild(this.imageNode);

        this.parentElement.appendChild(this.element);
    }

    pickRandomStudent() {
        const range = this.students.length
        const id = Math.floor(Math.random() * range);
        const name = this.students[id];

        return [ id, name ];
    }

    pickRandomImage() {
        const range = this.imageUrls.length;
        const id = Math.floor(Math.random() * range);
        
        return this.imageUrls[id];
    }

    setRandomStudentName(removeFromList, showImage) {
        if(!this.students.length) {
            this.render('No more students to pick from', showImage);
        }

        const [ id, name ] = this.pickRandomStudent();
        const imageUrl = showImage
            ? this.pickRandomImage()
            : '';

        if(removeFromList) {
            this.students.splice(id, 1);
        }

        this.render(name, imageUrl);
    }

    randomiseDisplay() {
        const step = 100;
        const fastInterval = 50;
        const fastIntervalStep = 5;
        const fastIntervalThreshold = 300;
        const intervalEnd = 900;

        let timeout = 1;

        const roll = () => {
            const interval = timeout < fastIntervalThreshold
                ? fastInterval
                : timeout;

            setTimeout(() => {
                const lastRoll = timeout >= intervalEnd;

                this.setRandomStudentName(lastRoll, lastRoll);

                if(lastRoll) {
                    return;
                }

                if(timeout < fastIntervalThreshold) {
                    timeout += fastIntervalStep;
                } else {
                    timeout += step;
                }

                roll();

            }, interval);
        }

        roll();
    }

    reset() {
        this.render();
        this.students = [...this.originalStudentList];
    }

    render(text = '', imageSrc = '') {
        this.textNode.innerText = text;
        this.imageNode.setAttribute('src', imageSrc);
    }
}
