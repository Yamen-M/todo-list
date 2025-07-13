import Project from './project.js';

export default class AppState {
    constructor() {
        this.projects = [];
        this.currentProjectId = null;
        this.init();
    }

    init() {
        const defaultProject = new Project('Inbox');
        this.projects.push(defaultProject);
        this.currentProjectId = defaultProject.id;
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.currentProjectId = newProject.id;
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
        if (this.currentProjectId === projectId) {
            this.currentProjectId = this.projects.length > 0 ? this.projects[0].id : null;
        }
    }

    getCurrentProject() {
        return this.projects.find(project => project.id === this.currentProjectId);
    }

    toggleTodoComplete(projectId, todoId) {
        const project = this.projects.find(project => project.id === projectId);
        if (project) {
            const todo = project.todos.find(todo => todo.id === todoId);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    }

    editTodo(projectId, todoId, updatedTodo) {
        const project = this.projects.find(project => project.id === projectId);
        if (project) {
            const todoIndex = project.todos.findIndex(todo => todo.id === todoId);
            if (todoIndex !== -1) {
                project.todos[todoIndex] = { ...project.todos[todoIndex], ...updatedTodo };
            }
        }
    }

    deleteTodo(projectId, todoId) {
        const project = this.projects.find(project => project.id === projectId);
        if (project) {
            project.todos = project.todos.filter(todo => todo.id !== todoId);
        }
    }
}
