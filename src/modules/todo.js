export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}
