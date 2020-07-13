class StudentListError extends Error {};

export default class StudentList {
    constructor(parent, list) {
        this.list = list;
        this.listNode = document.createElement('ul');

        parent.append(this.listNode);

        this.createListItems();
    }

    createListItems() {
        this.list.forEach((item) => {
            const node = document.createElement('li');

            node.textContent = item;

            this.listNode.append(node);
        });
    }

    highlightStudent(id) {
        const nodes = this.listNode.querySelectorAll('li');

        nodes.forEach((node) => {
            node.classList.remove('highlight');
        });

        nodes[id].classList.add('highlight');
    }

    disableStudent(id) {
        const nodes = this.listNode.querySelectorAll('li');

        nodes[id].classList.add('disable');
    }

    enableAllStudents() {
        const nodes = this.listNode.querySelectorAll('li');

        nodes.forEach((node) => {
            node.classList.remove('highlight');
            node.classList.remove('disable');
        });
    }
}