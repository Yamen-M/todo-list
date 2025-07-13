import "./style.css"
import AppState from './modules/stateManager';
import { renderSidebar, renderMainContent, showAddProjectForm, hideAddProjectForm, showAddTodoForm, hideAddTodoForm, showEditProjectForm, hideEditProjectForm, showEditTodoForm, hideEditTodoForm } from './modules/dom';
import Todo from './modules/todo';

const state = new AppState();

const renderApp = () => {
    renderSidebar(
        state.projects,
        state.currentProjectId,
        showAddProjectForm,
        (projectId) => {
            state.currentProjectId = projectId;
            renderApp();
        },
        (projectId) => {
            state.deleteProject(projectId);
            renderApp();
        }
    );

    const currentProject = state.getCurrentProject();
    renderMainContent(
        currentProject,
        showAddTodoForm,
        (todoId) => {
            state.toggleTodoComplete(state.currentProjectId, todoId);
            renderApp();
        },
        (todoId) => {
            const todo = currentProject.todos.find(t => t.id === todoId);
            if (todo) {
                showEditTodoForm(todo);
            }
        },
        (todoId) => {
            state.deleteTodo(state.currentProjectId, todoId);
            renderApp();
        }
    );
};

document.getElementById('addProjectForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const projectName = document.getElementById('projectName').value;
    if (projectName) {
        state.addProject(projectName);
        renderApp();
        hideAddProjectForm();
        event.target.reset();
    }
});

document.getElementById('cancelAddProjectBtn').addEventListener('click', hideAddProjectForm);
document.getElementById('cancelAddProject').addEventListener('click', hideAddProjectForm);

document.getElementById('editProjectForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const projectId = event.target.dataset.projectId;
    const projectName = document.getElementById('editProjectName').value;
    if (projectName) {
        const project = state.projects.find(p => p.id === projectId);
        if (project) {
            project.name = projectName;
            renderApp();
            hideEditProjectForm();
        }
    }
});

document.getElementById('cancelEditProjectBtn').addEventListener('click', hideEditProjectForm);
document.getElementById('cancelEditProject').addEventListener('click', hideEditProjectForm);

document.getElementById('addTodoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('todoTitle').value;
    const description = document.getElementById('todoDescription').value;
    const dueDate = document.getElementById('todoDueDate').value;
    const priority = document.getElementById('todoPriority').value;

    if (title && description && dueDate && priority) {
        const currentProject = state.getCurrentProject();
        if (currentProject) {
            const todo = new Todo(title, description, dueDate, priority);
            currentProject.addTodo(todo);
            renderApp();
            hideAddTodoForm();
            event.target.reset();
        }
    }
});

document.getElementById('editTodoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const todoId = event.target.dataset.todoId;
    const title = document.getElementById('editTodoTitle').value;
    const description = document.getElementById('editTodoDescription').value;
    const dueDate = document.getElementById('editTodoDueDate').value;
    const priority = document.getElementById('editTodoPriority').value;

    if (title && description && dueDate && priority) {
        state.editTodo(state.currentProjectId, todoId, { title, description, dueDate, priority });
        renderApp();
        hideEditTodoForm();
    }
});

document.getElementById('cancelAddTodoBtn').addEventListener('click', hideAddTodoForm);
document.getElementById('cancelAddTodo').addEventListener('click', hideAddTodoForm);
document.getElementById('cancelEditTodoBtn').addEventListener('click', hideEditTodoForm);
document.getElementById('cancelEditTodo').addEventListener('click', hideEditTodoForm);

renderApp();
